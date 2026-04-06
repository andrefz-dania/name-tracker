<script lang="ts">
  import { ImagePlus, Trash } from '@lucide/svelte'
  import ButtonDecorated from './ButtonDecorated.svelte'
  import AvatarLoader from './AvatarLoader.svelte'
  import { notif, sendNotif } from '../utils/context'

  type Props = {
    id: number
  }
  let { id }: Props = $props()

  const handleUpload = async () => {
    sendNotif(notif, 'Awaiting upload...', 'progress')
    const response = await window.api.updateImage(id)
    if (response.success) {
      sendNotif(notif, 'Upload complete', 'positive')
      // changes arent reflected unless component is reloaded
      window.location.reload()
    } else {
      sendNotif(notif, 'Error uploading image', 'destructive')
    }
  }

  const removeImage = async () => {
    const response = await window.api.removeImage(id)
    if (response.success) {
      sendNotif(notif, 'Image removed', 'positive')
            window.location.reload()
    } else {
      sendNotif(notif, 'Error deleting image', 'destructive')
    }
  }
</script>

<div class="relative group p-0 m-0">
  <div class="group-hover:opacity-50 p-0 m-0">
    <AvatarLoader {id}></AvatarLoader>
  </div>

  <div
    class="absolute top-0 w-full h-full items-center place-content-center flex flex-col gap-2 opacity-0 group-hover:opacity-100 px-6"
  >
    <ButtonDecorated onclick={handleUpload} style="normal" type="button"
      ><ImagePlus></ImagePlus>Change</ButtonDecorated
    >
    <ButtonDecorated onclick={removeImage} style="normal" type="button"
      ><Trash></Trash>Remove</ButtonDecorated
    >
  </div>
</div>
