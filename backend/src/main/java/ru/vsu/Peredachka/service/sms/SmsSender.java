package ru.vsu.Peredachka.service.sms;

import org.springframework.stereotype.Component;
import ru.dezhik.sms.sender.SenderService;
import ru.dezhik.sms.sender.SenderServiceConfiguration;
import ru.dezhik.sms.sender.SenderServiceConfigurationBuilder;
import ru.dezhik.sms.sender.api.InvocationStatus;
import ru.dezhik.sms.sender.api.smsru.SMSRuResponseStatus;
import ru.dezhik.sms.sender.api.smsru.cost.SMSRuCostRequest;
import ru.dezhik.sms.sender.api.smsru.cost.SMSRuCostResponse;
import ru.dezhik.sms.sender.api.smsru.send.SMSRuSendRequest;
import ru.dezhik.sms.sender.api.smsru.send.SMSRuSendResponse;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;

/**
 * @author Burdyug Pavel
 */
@Component
public class SmsSender {
    public void sendMessage(String phoneNumber, String message) throws IOException {
        SenderServiceConfiguration config = SenderServiceConfigurationBuilder.create()
                .setApiId("8BF43F95-E7ED-D113-3414-511CF1F435C6")
                .setReturnPlainResponse(true)
                .build();


        SenderService sender = new SenderService(config);
        SMSRuSendRequest sendRequest = new SMSRuSendRequest();
        sendRequest.setReceivers(Collections.singleton("+79507538117"));
        sendRequest.setText(message);
        SMSRuSendResponse sendResponse = sender.execute(sendRequest);
        if (sendRequest.getStatus() == InvocationStatus.SUCCESS) {
            /**
             * request was executed successfully now you can handle sendResponse
             * always check service API manual page for determine which codes should be treated as successful
             */
            if (sendResponse.getResponseStatus() == SMSRuResponseStatus.IN_QUEUE) {
                System.out.println(String.format("Success. Balance %4.2f, smsIds %s",
                        sendResponse.getBalance(), Arrays.toString(sendResponse.getMsgIds().toArray())));
            } else {
                System.out.println(String.format("Failed with status %s", sendResponse.getResponseStatus()));
            }
        } else {
            /**
             * Something went wrong and request failed, check sendRequest.getStatus()
             * usually the problem is in params validation or network or parsing response from the remote API.
             * {@link ru.dezhik.sms.sender.api.InvocationStatus}
             */
            if (sendRequest.getStatus().isAbnormal()) {
                sendRequest.getException().printStackTrace();
            }
        }
        sender.shutdown();
    }
}
