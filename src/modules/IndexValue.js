/**
 * Created by siri on 2017-02-03.
 */
//해당 값의 인덱스를 찾아냄.
class IndexValue {

    static indexValue(arr, pageNum) {

        Array.prototype.valueIndex = function (pval) {
            let idx = -1;
            if (this == null || this == undefined || pval == null || pval == undefined) {
            } else {
                for (let i = 0; i < this.length; i++) {
                    if (this[i] == pval) {
                        idx = i;
                        break;
                    }
                }
            }
            return idx;
        };

        for (let i = 0; i < arr.length; i++) {
            let idx = arr[i].valueIndex(pageNum);

            if (idx == -1) {
                console.log("배열안에 현재 입력한 값이 없습니다.");
            } else {
                console.log("배열안에 현재 입력한 값의 인덱스는 " + idx + " 입니다.");
                return idx;
            }
        }
    }

}
export default IndexValue;