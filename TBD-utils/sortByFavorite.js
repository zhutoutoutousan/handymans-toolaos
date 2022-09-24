// Traverse this.state.teamBoardsTree, rearrange according this.state.teamBoardsTree[i].trackers.favorited so the favorited elements begins first
const sortBoardInfoByFavorite = () => {
    let teamBoardsTree = this.state.teamBoardsTree
    return teamBoardsTree.sort((a, b) => {
        if (a.trackers.favorite && !b.trackers.favorite) {
            return -1
        } else if (!a.trackers.favorite && b.trackers.favorite) {
            return 1
        } else {
            return 0
        }
    }
    )
}