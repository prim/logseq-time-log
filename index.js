function main () {
  logseq.Editor.registerSlashCommand(
    'Time Log',
    async () => {

      const now = new Date()
      var hours = now.getHours()
      if (hours < 10) {
        hours = "0" + hours.toString()
      } else {
        hours = hours.toString()
      }
      var minutes = now.getMinutes()
      if (minutes < 10) {
        minutes = "0" + minutes.toString()
      } else {
        minutes = minutes.toString()
      }
      const begin = `${hours}:${minutes}`

      const end = '{end}'
      const text = `#log ${begin} - ${end} `
      await logseq.Editor.insertAtEditingCursor(text)

      const block = await logseq.Editor.getCurrentBlock()
      const prevBlock = await logseq.Editor.getPreviousSiblingBlock(block.uuid)
      if (prevBlock != null) {
        if (prevBlock.content.includes(end)) {
          prevContent = prevBlock.content.replace(end, begin)
          await logseq.Editor.updateBlock(prevBlock.uuid, prevContent)
        }
      }
      logseq.App.showMsg('begin  ' + begin)
    },
  )

}

// bootstrap
logseq.ready(main).catch(console.error)
