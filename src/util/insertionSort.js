function insertionSort(arr) {
    let i, j, v;
    for (i = 1; i < arr.length; i++) {
        v = arr[i];
        j = i;
        while (j > 0 && arr[j - 1] > v) {
            arr[j] = arr[j - 1]; // move the element to the left by 1 step;
            j--;
        }
        arr[j] = v; // fill the empty with the value that compared
    }
}