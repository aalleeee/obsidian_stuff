import { MarkdownView, Plugin, WorkspaceLeaf } from "obsidian";

export default class CycleThroughPanes extends Plugin {

setActiveLeaf(leaf: WorkspaceLeaf): void {
  this.app.workspace.setActiveLeaf(leaf);
  (leaf.view as MarkdownView).editor.focus();
}

onload() {
  console.log('loading plugin: Cycle through panes');

  this.addCommand({
    id: 'cycle-through-panes',
    name: 'Cycle through Panes',
    checkCallback: (checking: boolean) => {
      let active = this.app.workspace.activeLeaf;
      if (active) {
        if (!checking) {
          let leafs = this.app.workspace.getLeavesOfType("markdown");
          let index = leafs.indexOf(active);
          if (index === leafs.length - 1) {
            this.app.workspace.setActiveLeaf(leafs[0], true, true);
          } else {
            this.app.workspace.setActiveLeaf(leafs[index + 1], true, true);
          }
        }
        return true;
      }
      return false;
    }
  });

  this.addCommand({
    id: 'cycle-through-panes-reverse',
    name: 'Cycle through panes (Reverse)',
    callback: () => {
      let active = this.app.workspace.activeLeaf;
      let leafs = this.app.workspace.getLeavesOfType("markdown");
      let index = leafs.indexOf(active);
      if (index) {
        if (index === 0) {
          this.app.workspace.setActiveLeaf(leafs[leafs.length - 1], true, true);
        } else {
          this.app.workspace.setActiveLeaf(leafs[index - 1], true, true);
        }
      }
    }
  });
}
}