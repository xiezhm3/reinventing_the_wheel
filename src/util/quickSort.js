function qs(arr, l, r) {
    let partitionIndex, p;
    if (l < r) {
        p = r;
        partitionIndex = partition(arr, p, l, r);

        qs(arr, l, partitionIndex - 1);
        qs(arr, partitionIndex + 1, r);
    }
}

function partition(arr, p, l, r) {
    // p equals to r here
    let partitionIndex = l;
    for (let i = l; i < r; i++) {
        if (arr[i] < arr[p]) {
            swap(arr, i, partitionIndex);
            partitionIndex++;
        }
    }
    swap(arr, r, partitionIndex);
    return partitionIndex;
}

function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

module.export = qs;