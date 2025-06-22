import { TreeDataType } from '../types';

export class DataLoader {
  constructor(private settings: Record<string, unknown>) {}

  public async loadData(): Promise<void> {
    if (
      (this.settings.url as string) &&
      (this.settings.url as string).length > 0
    ) {
      const dataType = this.getDataType();

      try {
        const data = await this.makeAjaxRequest(dataType);
        this.settings.dataset = data;
      } catch (error) {
        const err = error as Record<string, unknown>;
        (
          this.settings.onprocessingerror as (
            xhr: unknown,
            ajaxOptions: string,
            thrownError: string
          ) => void
        )(
          err.xhr || err,
          err.ajaxOptions || '',
          err.thrownError || (err.message as string)
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

  private makeAjaxRequest(dataType: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'GET',
        async: this.settings.async as boolean,
        url: this.settings.url as string,
        dataType: dataType,
        success: data => {
          resolve(data);
        },
        error: (xhr, ajaxOptions, thrownError) => {
          reject({ xhr, ajaxOptions, thrownError });
        },
      });
    });
  }
}
