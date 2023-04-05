// Your task is to add the missing logic to a transformToObjects() function that transforms a list of numbers into a list of JavaScript objects.

// For the provided input [1, 2, 3] the transformToObjects() function should return [{val: 1}, {val: 2}, {val: 3}].

function transformToObjects(numberArray) {
    // Todo: Add your logic
    // should return an array of objects

    // Example:
    // transformToObjects([1, 2, 3]) should return [{val: 1}, {val: 2}, {val: 3}]

    // Your code here
    return numberArray.map((number) => {
        return { val: number };
    });
}


// Traverse model, while model is an array of objects, for every object, get the index number "curatedItemIndex" where the object has property "label" is Curated, then set
// updatedMenu[curatedItemIndex].item[0] to curatedCollectionMenu, then updatedMenu[curatedItemIndex].item[1] to curatedFeedsMenu
function updateMenu(updatedMenu, curatedCollectionMenu, curatedFeedsMenu) {
    updatedMenu.forEach((menu, index) => {
        switch (menu.label) {
            case 'Curated':
                updatedMenu[index].item[0] = curatedCollectionMenu;
                updatedMenu[index].item[1] = curatedFeedsMenu;
                break;
        }
    });
}

// Traverse currentStreamsInfo, which is an array of objects. During traversal, if each object doesn't have "item" children and it doesn't have streamId property, jump to next iteration.
// If it has streamId property, then return the object if streamId is equal to streamIdToFind. If it has "item" children, then traverse the children and repeat the same logic.
function findStreamInfo(currentStreamsInfo, streamIdToFind) {
    let streamInfo;
    currentStreamsInfo.forEach((stream) => {
        //check if streamId is equal to streamIdToFind first
        if (stream.streamId === streamIdToFind) {
            streamInfo = stream;
            return;
        }
        // Else check if stream has "item" children
        else if (stream.item) {
            streamInfo = findStreamInfo(stream.item, streamIdToFind);
            if (streamInfo) {
                return;
            }
        }
    });
    return streamInfo;
}

// Verify if the string is in uuid format
function isUuid(str) {
    return str.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
}

// Verify if the string is in Microsoft Team Webhook format
