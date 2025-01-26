import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import colors from '@/constants/color';
import { saveTerms, getTerms, setTermsAccepted } from '../context';

export default function TCPage() {
  const [terms, setTerms] = useState('');
  const router = useRouter();
  

  useEffect(() => {
    const loadTerms = async () => {
      const storedTerms = await getTerms();
      if (storedTerms) {
        console.log('Loaded Terms:', storedTerms);
        setTerms(storedTerms);
      } else {
        const defaultTerms = `
        About Our Services
        Privacy And Security Principles:
        Since we started Chatterly, we've built our Services with strong privacy and security principles in mind.
        
        Connecting You With Other People:
        We provide, and always strive to improve, ways for you to communicate with other Chatterly users, including through messages, voice and video calls, sending images and video, showing your status, and sharing your location with others when you choose. We may provide a convenient platform that enables you to send and receive money to or from other users across our platform. Chatterly works with partners, service providers, and affiliated companies to help us provide ways for you to connect with their services.
        
        Ways To Improve Our Services:
        We analyze how you make use of Chatterly to improve our Services, including helping businesses who use Chatterly measure the effectiveness and distribution of their services and messages. Chatterly uses the information it has and also works with partners, service providers, and affiliated companies to do this.
        
        Communicating With Businesses:
        We provide, and always strive to improve, ways for you and businesses and other organizations to communicate with each other using our Services, such as through order, transaction, and appointment information, delivery and shipping notifications, product and service updates, and marketing.
        
        Safety, Security, And Integrity:
        We work to protect the safety, security, and integrity of our Services. This includes appropriately dealing with abusive people and activity violating our Terms. We work to prohibit misuse of our Services, including harmful conduct towards others, violations of our Terms and policies, and address situations where we may be able to help support or protect our community. If we learn of people or activity like this, we will take appropriate action, including by removing such people or activity or contacting law enforcement. Any such removal will be in accordance with the “Termination” section below.
        
        Enabling Access To Our Services:
        To operate our global Services, we need to store and distribute content and information in data centers and systems around the world, including outside your country of residence. The use of this global infrastructure is necessary and essential to provide our Services. This infrastructure may be owned or operated by our service providers, including affiliated companies.
        
        Affiliated Companies:
        We are part of the Meta Companies. As part of the Meta Companies, Chatterly receives information from and shares information with the Meta Companies as described in Chatterly's Privacy Policy, including to provide integrations that enable you to connect your Chatterly experience with other Meta Company Products; to ensure security, safety, and integrity across the Meta Company Products; and to improve your ads and products experience across the Meta Company Products. Learn more about the Meta Companies and their terms and policies here.
        
        NO ACCESS TO EMERGENCY SERVICES
        There are important differences between our Services and your mobile phone, fixed-line telephone, and SMS services. Our Services do not provide access to emergency services or emergency services providers, including the police, fire departments, or hospitals, or otherwise connect to public safety answering points. You should ensure you can contact your relevant emergency services providers through a mobile phone, fixed-line telephone, or other service.
        
        IF YOU ARE A CHATTERLY USER LOCATED IN THE UNITED STATES OR CANADA
        Our terms contain a binding arbitration provision, which states that, except if you opt out and except for certain types of disputes, Chatterly and you agree to resolve all disputes through binding individual arbitration. This means that you waive any right to have those disputes decided by a judge or jury, and that you waive your right to participate in class actions, class arbitrations, or representative actions. Please read the "Special Arbitration Provision for United States or Canada Users" section below to learn more.
        
        Registration:
        You must register for our Services using accurate information, provide your current mobile phone number, and, if you change it, update your mobile phone number using our in-app change number feature. You agree to receive text messages and phone calls (from us or our third-party providers) with codes to register for our Services.
        
        Address Book:
        You can use the contact upload feature and provide us, if permitted by applicable laws, with the phone numbers in your mobile address book on a regular basis, including those of both the users of our Services and your other contacts. Learn more about our contact upload feature here.
        
        Age:
        You must be at least 13 years old to register for and use our Services (or such greater age required in your country or territory for you to be authorized to register for and use our Services without parental approval). In addition to being of the minimum required age to use our Services under applicable law, if you are not old enough to have authority to agree to our Terms in your country or territory, your parent or guardian must agree to our Terms on your behalf. Please ask your parent or guardian to read these Terms with you.
        
        Devices And Software:
        You must provide certain devices, software, and data connections to use our Services, which we otherwise do not supply. To use our Services, you consent to manually or automatically download and install updates to our Services. You also consent to our sending you notifications via our Services from time to time as necessary to provide our Services to you.
        
        Fees And Taxes:
        You are responsible for all carrier data plans, Internet fees, and other fees and taxes associated with your use of our Services.
        
        Privacy Policy And User Data:
        Chatterly cares about your privacy. Chatterly's Privacy Policy describes our data practices, including the types of information we receive and collect from you, how we use and share this information, and your rights in relation to the processing of information about you.
        
        Acceptable Use Of Our Services:
        You must use our Services according to our Terms and posted policies. If you violate our Terms or policies, we may take action with respect to your account, including disabling or suspending your account. If we do, you agree not to create another account without our permission. Disabling or suspending your account will be in accordance with the "Termination" section below.
        
        Legal And Acceptable Use:
        You must access and use our Services only for legal, authorized, and acceptable purposes. You will not use (or assist others in using) our Services in ways that:
        (a) Violate, misappropriate, or infringe the rights of Chatterly, our users, or others, including privacy, publicity, intellectual property, or other proprietary rights.
        (b) Are illegal, obscene, defamatory, threatening, intimidating, harassing, hateful, racially or ethnically offensive, or instigate or encourage conduct that would be illegal or otherwise inappropriate, such as promoting violent crimes, endangering or exploiting children or others, or coordinating harm.
        (c) Involve publishing falsehoods, misrepresentations, or misleading statements.
        (d) Impersonate someone.
        (e) Involve sending illegal or impermissible communications such as bulk messaging, auto-messaging, auto-dialing, and the like.
        (f) Involve any non-personal use of our Services unless otherwise authorized by us.
        `;
        
        console.log('Using Default Terms:', defaultTerms);
        setTerms(defaultTerms);
        await saveTerms(defaultTerms);
      }
    };
    loadTerms();
  }, []);

  const handleContinue = async () => {
    try {
      await setTermsAccepted();
      console.log('Terms accepted!');
      router.push('../login/terms');
    } catch (error) {
      Alert.alert('Error', 'Unable to proceed. Please try again.');
    }
  };

  return (
   
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 20 }}>
        <Text style={styles.title}>Full Terms and Conditions</Text>
        <Text style={styles.text}>{terms}</Text>
      </ScrollView>
      <Button
        title="Continue"
        onPress={handleContinue}
        color={colors.secondary}
      />
    </View>
  
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background || '#ffffff',
  },
  scrollContainer: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.secondary || '#333333',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: colors.text || '#333333',
  },
clear: {
  
},
});
