<script lang="ts" setup>
import { ref, } from 'vue'
import { useTransactionStore } from '@/stores/transaction.store'
import { storeToRefs } from 'pinia'
// import { eventTypes, useEventsBus } from '@/hooks/events'
// import { showConfirmDialog } from 'vant'

// const $bus = useEventsBus()
const transStore = useTransactionStore()
const {
  wallet, // isLoading: authLoading, // If you need to show auth-specific loading in App.vue
  // error: authError, // Auth store errors
} = storeToRefs(transStore)
const _storeId = ref()
// async function set_storeId(_method: number) {
//   method.value = _method
//   //console.log(method.value)
// }
function setStoreId(val: string) {
  // console.log(val)

  if (wallet.value!.balance > 0) {
    // activeName.value = 'z'
    // showConfirmDialog({
    //   title: 'Set Store',
    //   theme: 'round-button',
    //   message:
    //     'This action will set your current crystals to 0 as well as permantely set your store. Are you sure you want to continue?',
    // })
    //   .then(async () => {
    //     // on confirm
    //     // const gr = await pb.collection('shops').getList(1, 100, {
    //     //     filter: `id = '${val}'`,
    //     //     // sort: '-bids',
    //     // })
    //     // if (gr.items[0].id !== undefined) {
    //     //     currentUser.value = await pb
    //     //         .collection('users')
    //     //         .update<IUser>(currentUser.value?.id, {
    //     //             shopId: gr.items[0].id,
    //     //             shop_id: gr.items[0]._id,
    //     //         })
    //     // }
    //     activeName.value = 'a'
    //   })
    //   .catch(() => {
    //     // on cancel
    //   })
  }
}
</script>

<template>

    <div class="w-full flex flex-col justify-center">
      <h6 id="words" class="text-h6 mx-auto mb-2 text-white">
        Please enter the store's Id
      </h6>
      <div inset>
        <Input v-model="_storeId" class="justify-center bg-black" center minlength="4" maxlength="15" style="
            font-size: 22px;
            background-color: black;
            border-style: solid;
            border-radius: 10px;
            border-color: white;
            border-width: 3px;
            border: 3px solid #4195fc;
            -webkit-border-radius: 14px;
            -moz-border-radius: 14px;
            border-radius: 14px;

            -webkit-box-shadow: 0px 0px 14px #4195fc;
            -moz-box-shadow: 0px 0px 14px #4195fc;
            box-shadow: 0px 0px 14px #4195fc;
          " />
      </div>
      <!-- <GlassButton
                :disabled="_storeId.length < 4"
                title="Submit"
                color="green"
                class="pa-6 mt-14 pt-4"
                style="max-width: 200px; margin: auto"
                @click="
                  _storeId.length >= 4 ? set_storeId(_storeId) : ''
                "
              >
                NEXT
              </GlassButton> -->

      <GlassButton :disabled="_storeId.length < 4" class=""
        style="padding-left: 22px; padding-right: 22px; font-weight: 800; font-size: x-large" type="submit"
        @click="setStoreId(_storeId)">
        Next
        <span class="loading loading-spinner loading-lg" />
      </GlassButton>
    </div>
</template>
