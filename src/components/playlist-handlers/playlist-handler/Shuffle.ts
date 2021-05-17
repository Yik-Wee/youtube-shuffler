function shufflePlaylistItems(arr1: string[], arr2: string[], arr3: string[], arr4: string[]) {
  for (let i = 0; i < arr1.length; i++) {
    // random index of array
    let randNum: number = Math.floor(Math.random() * (arr1.length - 1));

    // swap arr1, arr2, arr3, and arr4
    [arr1[i], arr1[randNum]] = [arr1[randNum], arr1[i]];
    [arr2[i], arr2[randNum]] = [arr2[randNum], arr2[i]];
    [arr3[i], arr3[randNum]] = [arr3[randNum], arr3[i]];
    [arr4[i], arr4[randNum]] = [arr4[randNum], arr4[i]];
  }
}

export default shufflePlaylistItems;