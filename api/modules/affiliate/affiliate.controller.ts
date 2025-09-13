import { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'
import z from 'zod'
import settingService from '../common/setting.service'
import * as userService from '../user/user.service'
import {
  AffiliateUsersPayload,
  ChildrenAffiliatePayload,
  CommissionUpdatePayload,
  DashboardChildrenPayload,
  UpdateAffiliateSchema,
  UpdatePasswordSchema,
} from './affiliate.schema'
import * as affiliateService from './affiliate.service'
import * as utils from './utils'

export const updatePassword = async (c: Context) => {
  const affiliate = c.get('affiliate')
  const { oldPassword, newPassword } = await c.req.json<z.infer<typeof UpdatePasswordSchema>>()

  if (!(await utils.isPasswordMatch(oldPassword, affiliate.password))) {
    throw new HTTPException(400, { message: 'Current password is incorrect' })
  }
  await affiliateService.updatePassword(affiliate.id, newPassword)
  return c.body(null, 204)
}

export const updateAffiliate = async (c: Context) => {
  const affiliate = c.get('affiliate')
  const data = await c.req.json<z.infer<typeof UpdateAffiliateSchema>>()

  if (data.email && (await affiliateService.emailTaken(data.email, affiliate.id))) {
    throw new HTTPException(400, { message: 'Email already exist' })
  }
  if (data.username && (await affiliateService.usernameTaken(data.username, affiliate.id))) {
    throw new HTTPException(400, { message: 'Username already exist' })
  }
  const updatedAffiliate = await affiliateService.patchUpdate(affiliate.id, data)
  return c.json(updatedAffiliate)
}

export const referralCount = async (c: Context) => {
  const affiliate = c.get('affiliate')
  const affiliates = await affiliateService.getAffiliateByparentId(affiliate.id)
  const users = await userService.findUserById(affiliate.id)

  const activeAffiliates = affiliates.filter((a) => a.status === 'active').length
  const activeUsers = users.filter((u: { status: string }) => u.status === 'active').length

  const affiliateData = {
    all: affiliates.length,
    active: activeAffiliates,
    inactive: affiliates.length - activeAffiliates,
  }

  const userData = {
    all: users.length,
    active: activeUsers,
    inactive: users.length - activeUsers,
  }

  return c.json({ affiliate: affiliateData, user: userData })
}

export const getDashboard = async (c: Context) => {
  const affiliate = c.get('affiliate')
  const { duration = 'all' } = c.req.query()

  const dashboard = await affiliateService.getDashboard({
    parentId: affiliate.id,
    duration: String(duration),
  })
  const userCount = await affiliateService.getAffiliateUsers(affiliate.id, {
    username: affiliate.username as string,
    currentPage: 0,
    rowsPerPage: 0,
  })

  const data: any = { user: userCount }
  dashboard.forEach((d) => {
    data[d.role] = d.count
  })
  return c.json(data)
}

export const getDashboardChildren = async (c: Context) => {
  const affiliate = c.get('affiliate')
  const body = await c.req.json<z.infer<typeof DashboardChildrenPayload>>()
  const data = await affiliateService.getDashboardChildren(affiliate.id, body)
  return c.json(data)
}

export const getChildrenAffiliate = async (c: Context) => {
  const affiliate = c.get('affiliate')
  const body = await c.req.json<z.infer<typeof ChildrenAffiliatePayload>>()
  const data = await affiliateService.getChildrenAffiliate(affiliate.id, body)
  return c.json(data)
}

export const getAffiliateUsers = async (c: Context) => {
  const affiliate = c.get('affiliate')
  const body = await c.req.json<z.infer<typeof AffiliateUsersPayload>>()
  const data = await affiliateService.getAffiliateUsers(affiliate.id, body)
  return c.json(data)
}

export const getTreeAffiliate = async (c: Context) => {
  const affiliate = c.get('affiliate')
  const data = await affiliateService.getTreeAffiliate(affiliate.id)
  return c.json(data)
}

export const getCommission = async (c: Context) => {
  const setting = await settingService.getSetting()
  if (setting) {
    return c.json(setting.referralCommissionRate)
  }
  return c.json(0)
}

export const updateCommission = async (c: Context) => {
  const body = await c.req.json<z.infer<typeof CommissionUpdatePayload>>()
  const setting = await settingService.updateSetting({ referralCommissionRate: body })
  return c.json(setting[0].referralCommissionRate)
}
