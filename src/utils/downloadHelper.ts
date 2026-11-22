
import { Download, Page } from '@playwright/test';

export class DownloadHelper {

    static async downloadFile(page: Page, downloadAction: () => Promise<void>): Promise<Download> {

        const [download] = await Promise.all([
            page.waitForEvent('download'),
            downloadAction()
        ]);

        return download;
    }

    static async saveDownload(download: Download,filePath: string): Promise<void> {
        await download.saveAs(filePath);
    }
}
