// TOGGLE_TYPE
const BOOKMARK_TYPE = 'BOOKMARK'
const READ_TYPE = 'READ'
// Traverse this.state.searchResult, find the element whose id equals the articleId, use switch to toggle the type, if the type is BOOKMARK_TYPE, set article.trackers.bookmarked to opposite, and if the type is READ_TYPE, set article.trackers.read to opposite, return the updated searchResult
const toggleSpecificArticleStatus = (articleId, TOGGLE_TYPE) => {
    let searchResult = this.state.searchResult
    let article = searchResult.find(article => article.id === articleId)
    switch (TOGGLE_TYPE) {
        case BOOKMARK_TYPE:
        article.trackers.bookmarked = !article.trackers.bookmarked
        break
        case READ_TYPE:
        article.trackers.read = !article.trackers.read
        break
        default:
        break
    }
    return searchResult
}

// Traverse this.state.teamFeedsTree, if this.state.teamFeedsTree[i].id matches streamId, set the this.state.teamFeedsTree[i].trackers.favorite to opposite, then traverse this.state.teamFeedsTree[i].feeds, if this.state.teamFeedsTree[i].feeds[j].id matches streamId, update this.state.teamFeedsTree[i].feeds[j].trackers.favorite to opposite, finally return the updated teamFeedsTree
const toggleTeamFeedsTreeStatus = (streamId, TOGGLE_TYPE) => {
    let teamFeedsTree = this.state.teamFeedsTree
    return teamFeedsTree.map(teamFeed => {
        if (teamFeed.id === streamId) {
            teamFeed.trackers.favorite = !teamFeed.trackers.favorite
            teamFeed.feeds.map(feed => {
                if (feed.id === streamId) {
                    feed.trackers.favorite = !feed.trackers.favorite
                }
            }
            )
        }
        return teamFeed
    }
    )
}

// Traverse addToBoardDropdownInfoStaging, if addToBoardDropdownInfoStaging[i].type is "personal", push addToBoardDropdownInfoStaging[i] to addToBoardDropdownInfoTemplate.personal, if it's "team", then it will be addToBoardDropdownInfoTemplate.team
const addToBoardDropdownInfoTemplate = (addToBoardDropdownInfoStaging) => {
    let addToBoardDropdownInfoTemplate = {
        personal: [],
        team: []
    }
    addToBoardDropdownInfoStaging.map(board => {
        // Use switch
        switch (board.type) {
            case 'personal':
                addToBoardDropdownInfoTemplate.personal.push(board)
                break
            case 'team':
                addToBoardDropdownInfoTemplate.team.push(board)
                break
            default:
                break
    }
    )
    return addToBoardDropdownInfoTemplate
}

// Traverse this.state.addArticleToBoardOriginal.personal and this.state.addArticleToBoardOriginal.team, if each item's "is_tagged" is false and its "id" is not in the this.state.addArticleToBoardStaging array, push it to the addArticleToBoardToggleList
const addArticleToBoardToggleList = (addArticleToBoardOriginal) => {
    let addArticleToBoardToggleList = []
    addArticleToBoardOriginal.personal.map(board => {
        if (board.is_tagged ^ this.state.addArticleToBoardStaging.includes(board.id)) {
            addArticleToBoardToggleList.push(board)
        }
    }
    )
    addArticleToBoardOriginal.team.map(board => {
        if (board.is_tagged ^ this.state.addArticleToBoardStaging.includes(board.id)) {
            addArticleToBoardToggleList.push(board)
        }
    }
    )
    return addArticleToBoardToggleList
}

// For given rl_index and or_index, and given searchOptions as array, remove searchOptions[rl_index].ors[or_index] and return the updated searchOptions
const removeOr = (rl_index, or_index, searchOptions) => {
    searchOptions[rl_index].ors.splice(or_index, 1)
    return searchOptions
}

// Find the index of currentArticle in currentArticles by id, then set the currentArticle to currentArticles[index + 1], if index + 1 is out of range, set currentArticle to currentArticles[0]
const nextArticle = (currentArticle, currentArticles) => {
    let index = currentArticles.findIndex(article => article.id === currentArticle.id)
    if (index + 1 < currentArticles.length) {
        currentArticle = currentArticles[index + 1]
    } else {
        currentArticle = currentArticles[0]
    }
    return currentArticle
}

const previousArticle = (currentArticle, currentArticles) => {
    let index = currentArticles.findIndex(article => article.id === currentArticle.id)
    if (index - 1 >= 0) {
        currentArticle = currentArticles[index - 1]
    } else {
        currentArticle = currentArticles[currentArticles.length - 1]
    }
    return currentArticle
}

// Output diff array of ids based on two array of objects by its id
const diffArray = (array1, array2) => {
    let array1Ids = array1.map(item => item.id)
    let array2Ids = array2.map(item => item.id)
    return [...array1Ids.filter(id => !array2Ids.includes(id)), ...array2Ids.filter(id => !array1Ids.includes(id))]
}

// Convert string format like firstname.middlename.lastname@xxx.com to Firstname Lastname, the format can be without middlename
const convertEmailToName = (email) => {
    let name = email.split('@')[0]
    let nameArray = name.split('.')
    // Edge Case: Only firstname
    if (nameArray.length === 1) {
        return nameArray[0].charAt(0).toUpperCase() + nameArray[0].slice(1)
    }
    if (nameArray.length === 2) {
        return nameArray[0].charAt(0).toUpperCase() + nameArray[0].slice(1) + ' ' + nameArray[1].charAt(0).toUpperCase() + nameArray[1].slice(1)
    } else if (nameArray.length === 3) {
        return nameArray[0].charAt(0).toUpperCase() + nameArray[0].slice(1) + ' ' + nameArray[2].charAt(0).toUpperCase() + nameArray[2].slice(1)
    }
}