import $ from 'jquery';
class ReferenceMapping {
    constructor () {
        this.referenceMap = [];
    }
    static mappingData (data) {
        this.referenceMap = [];
        for (var userData in data) {
            this.referenceMap.push({id:data[userData].id, reference: userData })
        }
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