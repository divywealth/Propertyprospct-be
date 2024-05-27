import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import * as SibApiV3Sdk from 'sib-api-v3-sdk';
import { EmailPayloadDto } from 'src/code/dto/email-payload.dto';

@Injectable()
export class NotificationService {
  // constructor(private readonly configService: ConfigService) {
  //   SendGrid.setApiKey(this.configService.get<string>('SEND_GRID_KEY'))
  // }

  // async emailNotificationService(mail: SendGrid.MailDataRequired) {
  //   try {
  //       const sendEmail =  await SendGrid.send(mail)
  //       return sendEmail;
  //   } catch (error) {
  //       throw error.message
  //   }
  // }
  private apiInstance: SibApiV3Sdk.TransactionalEmailsApi;

  constructor(private configService: ConfigService) {
    const apiKey = SibApiV3Sdk.ApiClient.instance.authentications['api-key'];
    apiKey.apiKey = this.configService.get<string>('SENDINBLUE_API_KEY');

    this.apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  }

  async emailNotificationService(emailPayload: EmailPayloadDto): Promise<void> {
    console.log(this.configService.get<string>('SENDINBLUE_API_KEY'))
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.to = [{ email: emailPayload.to }];
    sendSmtpEmail.sender = { email: 'divywealth1@gmail.com', name: 'PropertyProspect' }; // Set the sender email and name
    sendSmtpEmail.subject = emailPayload.subject;
    sendSmtpEmail.htmlContent = emailPayload.htmlContent;

    try {
      await this.apiInstance.sendTransacEmail(sendSmtpEmail);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email', error);
    }
  }


  async smsNotificationService() {}
}
