import { TreeDataType } from '../types';

export class DataLoader {
  constructor(private settings: any) {}

  public async loadData(): Promise<void> {
    if (this.settings.url && this.settings.url.length > 0) {
      const dataType = this.getDataType();

      try {
        const data = await this.makeAjaxRequest(dataType);
        this.settings.dataset = data;
      } catch (error) {
        const err = error as any;
        this.settings.onprocessingerror(
          err.xhr || err,
          err.ajaxOptions || '',
          err.thrownError || err.message
        );
      }
    }
  }

  private getDataType(): string {
    switch (this.settings.datatype) {
      case TreeDataType.Json:
        return 'json';
      case TreeDataType.Xml:
        return 'xml';
      default:
        return 'json';
    }
  }

  private makeAjaxRequest(dataType: string): Promise<any> {
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
