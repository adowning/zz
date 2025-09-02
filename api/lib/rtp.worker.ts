// Background worker to process RTP update jobs from the queue.
import chalk from 'chalk'
import { getRtpUpdateJobs, completeRtpUpdateJob } from './cache'
import { getRtpForPlayerToday, getRtpForGameSession } from '#/modules/nolimit/nolimit.utils'

const POLLING_INTERVAL_MS = 5000 // Check for new jobs every 5 seconds
let isProcessing = false
let intervalId: Timer | null = null

async function processRtpQueue() {
  if (isProcessing) {
    console.log(chalk.yellow('[WORKER] Skipping poll, previous cycle still processing.'))
    return
  }
  isProcessing = true

  try {
    const jobs = await getRtpUpdateJobs()
    if (jobs.length > 0) {
      console.log(chalk.cyan(`[WORKER] Found ${jobs.length} RTP job(s) to process.`))
    }

    for (const { key, job } of jobs) {
      console.time(`[WORKER] Processing job ${key}`)
      try {
        const [playerRTPToday] = await getRtpForPlayerToday(job.userId)
        const [gameSessionRTP] = await getRtpForGameSession(job.sessionId)

        // Here, you would typically update a separate table with these aggregates.
        // For this example, we'll imagine updating the last spin record,
        // but in a real-world scenario, you'd update a user/session summary table.
        // This is a placeholder for the actual update logic.
        console.log(chalk.green(`[WORKER] Calculated RTPs for user ${job.userId}: Player=${playerRTPToday}%, Session=${gameSessionRTP}%`))


        // IMPORTANT: In a real application, you would update a summary table.
        // For this example, we are not performing a DB write to avoid complexity,
        // but the calculation part is the heavy lifting.

        await completeRtpUpdateJob(key)
        console.log(chalk.cyan(`[WORKER] Completed and removed job ${key}.`))
      } catch (error) {
        console.error(chalk.red(`[WORKER] Error processing job ${key}:`), error)
        // Optionally, implement a retry mechanism or move to a dead-letter queue.
      } finally {
        console.timeEnd(`[WORKER] Processing job ${key}`)
      }
    }
  } catch (error) {
    console.error(chalk.red('[WORKER] Critical error during queue processing:'), error)
  } finally {
    isProcessing = false
  }
}

export function startRtpWorker() {
  if (intervalId) {
    console.log(chalk.yellow('[WORKER] RTP worker is already running.'))
    return
  }
  console.log(chalk.blue('[WORKER] Starting RTP background worker...'))
  intervalId = setInterval(processRtpQueue, POLLING_INTERVAL_MS)
}

export function stopRtpWorker() {
  if (intervalId) {
    console.log(chalk.blue('[WORKER] Stopping RTP background worker...'))
    clearInterval(intervalId)
    intervalId = null
  }
}
