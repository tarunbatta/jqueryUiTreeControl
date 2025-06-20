import { TreeDataType } from '../types';
export class DataLoader {
    constructor(settings) {
        this.settings = settings;
    }
    async loadData() {
        if (this.settings.url && this.settings.url.length > 0) {
            const dataType = this.getDataType();
            try {
                const data = await this.makeAjaxRequest(dataType);
                this.settings.dataset = data;
            }
            catch (error) {
                const err = error;
                this.settings.onprocessingerror(err.xhr || err, err.ajaxOptions || '', err.thrownError || err.message);
            }
        }
    }
    getDataType() {
        switch (this.settings.datatype) {
            case TreeDataType.Json:
                return 'json';
            case TreeDataType.Xml:
                return 'xml';
            default:
                return 'json';
        }
    }
    makeAjaxRequest(dataType) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'GET',
                async: this.settings.async,
                url: this.settings.url,
                dataType: dataType,
                success: (data) => {
                    resolve(data);
                },
                error: (xhr, ajaxOptions, thrownError) => {
                    reject({ xhr, ajaxOptions, thrownError });
                },
            });
        });
    }
}
//# sourceMappingURL=dataLoader.js.map