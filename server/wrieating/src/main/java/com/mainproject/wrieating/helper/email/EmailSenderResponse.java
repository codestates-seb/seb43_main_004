package com.mainproject.wrieating.helper.email;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmailSenderResponse { // 이메일 난수 전송시 response
    private boolean isactive;
    private String message;
}
