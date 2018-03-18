import $ from 'jquery';
class ReferenceMapping {
    constructor () {
        this.referenceMap = [];
    }
    static mappingData (data) {
        console.log("remapping data", data);
        this.referenceMap = [];
        for (var userData in data) {
            this.referenceMap.push({id:data[userData].id, reference: userData })
        }
        console.log("remapping data", this.referenceMap);
        return ;
    }

    static getReferenceFromId (userId) {
        var reference;
        $.each(this.referenceMap, function(index, value) {
            if (value.id == userId) {
                reference = value.reference;
            }
        })
        return reference;
    }
}

export default ReferenceMapping;