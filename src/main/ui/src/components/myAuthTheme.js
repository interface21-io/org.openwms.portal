import {AmplifyTheme} from 'aws-amplify-react';
import {I18n} from 'aws-amplify';
import Background from './openwms_header.png';
import * as React from 'react';

const authScreenLabels = {
  en: {
    'Sign in to your account': 'Sign in to Portal',
    'Sign In Account': 'Create a new Profile'
  }
};

I18n.setLanguage('en');
I18n.putVocabularies(authScreenLabels);

const MySectionHeader = Object.assign({}, AmplifyTheme.sectionHeader, {
  background: 'white',
  color:'#152939',
  marginBottom: '30px',
  fontSize: '18px',
  fontWeight: '500',
  textAlign: 'left',
  borderTopLeftRadius: '2px',
  borderTopRightRadius: '2px',
  border: '1px solid #C4C4C4',
  borderRadius: '3px',
});
const MySectionFooter = Object.assign({}, AmplifyTheme.sectionFooter, {
    background: 'white',
    borderTopLeftRadius: '2px',
    borderTopRightRadius: '2px',
  });
const MyFormSection = Object.assign({}, AmplifyTheme.formSection, {
});

const MyButton = Object.assign({}, AmplifyTheme.button, {
    background: 'lightblue'
});

const MyFormContainer = Object.assign({}, AmplifyTheme.formContainer, {
    background: `url(${Background})`,
    minHeight: document.documentElement.clientHeight,
    width: document.documentElement.clientWidth,
    margin: 0,
})  
const MyTheme = Object.assign({}, AmplifyTheme, {
  sectionHeader: MySectionHeader,
  sectionFooter: MySectionFooter,
  button: MyButton,
  formSection: MyFormSection,
  signInButtonIcon: { 'display': 'none' },
  signInButtonContent: { 'font-family': 'Helvetica Neue' },
});

export default MyTheme;