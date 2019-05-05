/**
 * Selection sort stops, when unsorted part becomes empty.
 * As we know, on every step number of unsorted elements decreased by one. 
 * Therefore, selection sort makes n steps (n is number of elements in array) of outer loop, before stop. 
 * Every step of outer loop requires finding minimum in unsorted part. Summing up, n + (n - 1) + (n - 2) + ... + 1, 
 * results in O(n2) number of comparisons. Number of swaps may vary from zero (in case of sorted array) 
 * to n - 1 (in case array was sorted in reversed order), which results in O(n) number of swaps. 
 * Overall algorithm complexity is O(n2).
 */

function selectionSort(arr) {
    let minIndex;

    for (var i = 0; i < arr.length - 1; i++) {
        // find the minimun element
        minIndex = i;
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        // swap
        if (minIndex !== i) {
            swap(arr, i, minIndex);
        }
    }
}