import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class NotificationService {
  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get<string>('SEND_GRID_KEY'))
  }

  async emailNotificationService(mail: SendGrid.MailDataRequired) {
    try {
        const sendEmail =  await SendGrid.send(mail)
        return sendEmail;
    } catch (error) {
        throw error.message
    }
  }

  async smsNotificationService() {}
}
