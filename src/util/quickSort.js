function quickSort(arr, left, right) {
    const index = partition(arr, left, right);
    if (left < index - 1) {
        quickSort(arr, left, index - 1);
    }
    if (index < right) {
        quickSort(arr, index, right);
    }
}

function partition(arr, left, right) {
    let i = left,
        j = right;
    const pivot = arr(left + (right - left) / 2);
    while (i <= j) {
        while (i < j && arr[i] < pivot) {
            i++;
        }
        while (i < j && arr[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(arr, i, j);
            i++;
            i--;
        }
    }
    return i;
}