import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { AuthenticationService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import * as pgp from 'openpgp';

@Component({
  selector: 'app-cast-vote',
  templateUrl: './cast-vote.component.html',
  styleUrls: ['./cast-vote.component.css']
})
export class CastVoteComponent implements OnInit {

  pollCastForm: FormGroup;

  encrypted;

  title: string;
  options: any = [];
  id: string;
  pollFound = false;
  isSecure: Boolean;

  constructor(private authService: AuthenticationService,
              private route: ActivatedRoute,
              private fb: FormBuilder
  ) { }

  ngOnInit() {
    const pollid = this.route.snapshot.paramMap.get('id');
    console.log(pollid);
    this.authService.getPollInformation(pollid)
      .subscribe((response) => {
        this.title = response.title;
        this.options = response.options;
        this.id = response.id;
        this.isSecure = response.isSecure;
        this.pollFound = true;
      });

      this.pollCastForm = this.fb.group({
        voteOption: [''],
        privKey: ['']
      });
  }

  submit() {
    console.log(this.pollCastForm.controls);
    if (this.pollCastForm.controls['voteOption'].value !== '') {
      if (this.isSecure === false) {
        const voteObject = {
          pollid: this.id,
          option: this.pollCastForm.controls['voteOption'].value,
        };
        this.authService.castVote(voteObject);
      } else {
        const voteObject = {
          pollid: this.id,
          option: this.pollCastForm.controls['voteOption'].value,

        };

        const privkey =
        ['-----BEGIN PGP PRIVATE KEY BLOCK-----',
'Version: OpenPGP.js v4.4.7',
'Comment: https://openpgpjs.org',
'',
'xcFGBFxtkuABBACi7n+76f9WXWHzB12vo1auFgKzOGwoIjvgH8gaTVgW2l3Y',
'73vDmwXQ8tmRjFgcg1ASpCyqtPHOLywxuZ34UxpUUOvCrpOIcqMWgb7IWBGc',
'TvWZEk0Jf0rWxAVcuJAPGSPb+ODu4iVb5Xy7tRcABfVE738Tl2+UkkgxfU8c',
'BtLedwARAQAB/gkDCD6W/VdRqVDH4H6nqIMhgIMKdDUDJaD1EAEkjp8J2bQy',
'omoTRVyCTXC+OK7wZHUaO+sSCdiHB+LdolmV4RN76hF2XPxq19UAZigzsZXi',
'PVjSmkWpYri2AWbqsSGmY2cy8kApCuN3wPEPRjsdrQR7eCtI4Qs0NSfdvQFx',
'7Kel9VC8HfKuJwhRYKOtmE3ZwvAauZeaJcY3mwAD1AZLUYuR2euYtpz21MsJ',
'xPM8AHmoeX284+N0fkmgcwB3+WkE+EsHo/e5M6JGYUFvbfctfwrYWgJsqWJE',
'1vQOv7dyDzlLEkA2HBDo8z9YsrizRnIdnKax126Mk/JdR8Txp9Vv2rJag9Gl',
'LS9r6D7JFVzjebmyDLF/xWp+WYhseeoyCDHBNysoG1L/x7D4RaJcqSFEeShN',
'SzG/PH4JWeFqxTuNpaQOmLEIWbFuIid+Xb0fvV3hZdH7WS2h+Csb157VgZ/B',
'AqfUEpz6b7VAnfRjY0yJeIHuiLd/6/6kpSfNAMK1BBABCAAfBQJcbZLgBgsJ',
'BwgDAgQVCAoCAxYCAQIZAQIbAwIeAQAKCRCtq+Andixrcy+aA/4sUm8rAWEV',
'dNIInHXjaXMbe1YbYtvHmayM+0AbfAtEUBVMSvr0bgO0TVA2x5I+fkVO4vfG',
'hwi5AivRbUizt8OEuUt/XvEo0d5TMhT8+mLzFwW9Mzt5LY7pLL//tuK3gLyL',
'A1UULPIZQFDFs5Q4K/ELLyzcIows04P98/A1sVzV48fBRgRcbZLgAQP/TjGy',
'LtvWG8XzHNLHwkv/rfTqlGb8fQ91pum0i/dudtYUss9XF5MsppMTGW/Ay6WF',
'rbfJZWVlIDKm4EFtUHMsInzZe9LupofZFe5gJTvlYEW0T46Ik9WpJkDXQ8N7',
'xKEEL2uBhjhj03oia2VAscG/lMm2VKOtBokbVCW/CtkSKqcAEQEAAf4JAwjP',
'yM9Ww5cdAeAZ4i5zuJMrAE1TIivmG9lHihhURYU6bPpCNqRGjmjyaoxhbWA3',
'6D3W18dsfVH3sdQ2Nm46NXtzHEb0ztW+54uPQ7TuK26GSezBnQBVhLYWb4Ag',
'kc1Tx9eTTzgJR9GEG8XNshkIb3Q0K0C6Dz8U18vSZ3dCvsRxThKGXHg7M6zo',
'ywJ3pX5O7zpukzBHb0Fj2wWgaVE4SvpiuyOUEwsCemonsbhDNTtTQ6EYgzBT',
's75QsP0JOMCC1uxLIiW+a8Ze2Mp+eFBAXjDgbdn83ej19d12RaYFQ8riqUOv',
'CL7R2MfPPKOnhteJuNO7BvJRbv7xCrllpijaHhVB0gAKqv5K1tgz9pmKs65n',
'616k987nOniBmNHFfYO/larGy0K6RA6sryEkFKm7NqYVgPG7ia+7b4sTCnEy',
'o4I4YTMYTi+6NhG5B64JeESDb+UBdea5j3MQM0UsyOPBdEpPSEMt342aGzBr',
'KjI+mD9+5cbq/o73wp8EGAEIAAkFAlxtkuACGwwACgkQravgJ3Ysa3PQTQP/',
'TUR1rb3+7YvT/YsBA/ubyItmXAOaxXK8/9Ta93NNizfeNzh1ljQgcuJFoXKk',
'Hcz1IFLxnXVOwTEI6TsC7mXI9chUgca9+KIqCTHF8bz+2IPVP0lx4PJcdhIn',
'7+voq5X+4S8GFPGO4viyvX27OlaDjadbGHPDbKvJ1VIy/k6vD88=',
'=OsQs/',
'-----END PGP PRIVATE KEY BLOCK-----'].join('\r\n').replace(/\r/, '');

const pubkey = ['-----BEGIN PGP PUBLIC KEY BLOCK-----',
'Version: OpenPGP.js v4.4.7',
'Comment: https://openpgpjs.org',
'',
'xo0EXG2S4AEEAKLuf7vp/1ZdYfMHXa+jVq4WArM4bCgiO+AfyBpNWBbaXdjv',
'e8ObBdDy2ZGMWByDUBKkLKq08c4vLDG5nfhTGlRQ68Kuk4hyoxaBvshYEZxO',
'9ZkSTQl/StbEBVy4kA8ZI9v44O7iJVvlfLu1FwAF9UTvfxOXb5SSSDF9TxwG',
'0t53ABEBAAHNAMK1BBABCAAfBQJcbZLgBgsJBwgDAgQVCAoCAxYCAQIZAQIb',
'AwIeAQAKCRCtq+Andixrcy+aA/4sUm8rAWEVdNIInHXjaXMbe1YbYtvHmayM',
'+0AbfAtEUBVMSvr0bgO0TVA2x5I+fkVO4vfGhwi5AivRbUizt8OEuUt/XvEo',
'0d5TMhT8+mLzFwW9Mzt5LY7pLL//tuK3gLyLA1UULPIZQFDFs5Q4K/ELLyzc',
'Iows04P98/A1sVzV486NBFxtkuABA/9OMbIu29YbxfMc0sfCS/+t9OqUZvx9',
'D3Wm6bSL92521hSyz1cXkyymkxMZb8DLpYWtt8llZWUgMqbgQW1QcywifNl7',
'0u6mh9kV7mAlO+VgRbRPjoiT1akmQNdDw3vEoQQva4GGOGPTeiJrZUCxwb+U',
'ybZUo60GiRtUJb8K2RIqpwARAQABwp8EGAEIAAkFAlxtkuACGwwACgkQravg',
'J3Ysa3PQTQP/TUR1rb3+7YvT/YsBA/ubyItmXAOaxXK8/9Ta93NNizfeNzh1',
'ljQgcuJFoXKkHcz1IFLxnXVOwTEI6TsC7mXI9chUgca9+KIqCTHF8bz+2IPV',
'P0lx4PJcdhIn7+voq5X+4S8GFPGO4viyvX27OlaDjadbGHPDbKvJ1VIy/k6v',
'D88=',
'=HZmp',
'-----END PGP PUBLIC KEY BLOCK-----'].join('\r\n');

        const privKeyObj = (pgp.key.readArmored(privkey));
        privKeyObj.keys[0].decrypt('oiwerl43ksmpoq5wieurxmzcvnb9843lj3459ks');

        // const options = {
        //   data: voteObject.option,       // input as Message object
        //   publicKeys: pgp.key.readArmored(pubkey).keys, // for encryption
        // };

        // const pgpmsg = pgp.encrypt(options).then(function(ciphertext) {
        //   const encrypted = ciphertext.data;
        //   pgp.decrypt({
        //     message: pgp.message.readArmored(encrypted),
        //     privateKey: privKeyObj.keys[0],
        //     publicKeys: pgp.key.readArmored(pubkey).keys,
        //   }).then((decrypted) => { console.log(decrypted); });
        // });

        // FOR SIGNING THE VOTE
        const options = {
          data: voteObject.option,          // input as Message object
          privateKeys: privKeyObj.keys[0],  // for signing
        };

        const pgpmsg = pgp.sign(options).then(function(signed) {
          const cleartext = signed.data;
          console.log(cleartext);
          pgp.verify({
            message: pgp.cleartext.readArmored(cleartext),
            publicKeys: pgp.key.readArmored(pubkey).keys,
          }).then((verified) => {
            const validity = verified.signatures[0].valid;
            if (validity) {
              console.log('signed by key id ' + verified.signatures[0].keyid.toHex());
            }
          });
        });

      }

    }
  }

}
