import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Checkbox } from 'react-native-paper';
import { useRouter } from 'expo-router';
import colors from '@/constants/color';

export default function TCPage() {
  const [agree, setAgree] = useState(false);
  const router = useRouter();

  const handleContinue = async () => {
    await AsyncStorage.setItem('termsAccepted', 'true'); // Save agreement status
    router.push('/login/terms'); // Navigate back to terms page
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 20 }}>
        <Text style={styles.title}>Full Terms and Conditions</Text>
        <Text style={styles.text}>
          <Text style={styles.sectionTitle}>About Our Services</Text>
          {"\n"}
          {"\n"}Privacy And Security Principles. Since we started WhatsApp, we've built our Services with strong privacy and security principles in mind.
          {"\n\n"}Connecting You With Other People. We provide, and always strive to improve, ways for you to communicate with other WhatsApp users including through messages, voice and video calls, sending images and video, showing your status, and sharing your location with others when you choose. We may provide a convenient platform that enables you to send and receive money to or from other users across our platform. WhatsApp works with partners, service providers, and affiliated companies to help us provide ways for you to connect with their services.
          {"\n\n"}Ways To Improve Our Services. We analyze how you make use of WhatsApp, in order to improve our Services, including helping businesses who use WhatsApp measure the effectiveness and distribution of their services and messages. WhatsApp uses the information it has and also works with partners, service providers, and affiliated companies to do this.
          {"\n\n"}Communicating With Businesses. We provide, and always strive to improve, ways for you and businesses and other organizations, to communicate with each other using our Services, such as through order, transaction, and appointment information, delivery and shipping notifications, product and service updates, and marketing.
          {"\n\n"}Safety, Security, And Integrity. We work to protect the safety, security, and integrity of our Services. This includes appropriately dealing with abusive people and activity violating our Terms. We work to prohibit misuse of our Services including harmful conduct towards others, violations of our Terms and policies, and address situations where we may be able to help support or protect our community. If we learn of people or activity like this, we will take appropriate action, including by removing such people or activity or contacting law enforcement. Any such removal will be in accordance with the “Termination” section below.
          {"\n\n"}Enabling Access To Our Services. To operate our global Services, we need to store and distribute content and information in data centers and systems around the world, including outside your country of residence. The use of this global infrastructure is necessary and essential to provide our Services. This infrastructure may be owned or operated by our service providers including affiliated companies.
          {"\n\n"}Affiliated Companies. We are part of the Meta Companies. As part of the Meta Companies, WhatsApp receives information from, and shares information with, the Meta Companies as described in WhatsApp's Privacy Policy, including to provide integrations which enable you to connect your WhatsApp experience with other Meta Company Products; to ensure security, safety, and integrity across the Meta Company Products; and to improve your ads and products experience across the Meta Company Products. Learn more about the Meta Companies and their terms and policies here.
          {"\n\n"}NO ACCESS TO EMERGENCY SERVICES: There are important differences between our Services and your mobile phone and a fixed-line telephone and SMS services. Our Services do not provide access to emergency services or emergency services providers, including the police, fire departments, or hospitals, or otherwise connect to public safety answering points. You should ensure you can contact your relevant emergency services providers through a mobile phone, a fixed-line telephone, or other service.
          {"\n\n"}IF YOU ARE A WHATSAPP USER LOCATED IN THE UNITED STATES OR CANADA, OUR TERMS CONTAIN A BINDING ARBITRATION PROVISION, WHICH STATES THAT, EXCEPT IF YOU OPT OUT AND EXCEPT FOR CERTAIN TYPES OF DISPUTES, WHATSAPP AND YOU AGREE TO RESOLVE ALL DISPUTES (DEFINED BELOW) THROUGH BINDING INDIVIDUAL ARBITRATION, WHICH MEANS THAT YOU WAIVE ANY RIGHT TO HAVE THOSE DISPUTES DECIDED BY A JUDGE OR JURY, AND THAT YOU WAIVE YOUR RIGHT TO PARTICIPATE IN CLASS ACTIONS, CLASS ARBITRATIONS, OR REPRESENTATIVE ACTIONS. PLEASE READ THE "SPECIAL ARBITRATION PROVISION FOR UNITED STATES OR CANADA USERS" SECTION BELOW TO LEARN MORE.
          {"\n\n"}Registration. You must register for our Services using accurate information, provide your current mobile phone number, and, if you change it, update your mobile phone number using our in-app change number feature. You agree to receive text messages and phone calls (from us or our third-party providers) with codes to register for our Services.
          {"\n\n"}Address Book. You can use the contact upload feature and provide us, if permitted by applicable laws, with the phone numbers in your mobile address book on a regular basis, including those of both the users of our Services and your other contacts. Learn more about our contact upload feature here.
          {"\n\n"}Age. You must be at least 13 years old to register for and use our Services (or such greater age required in your country or territory for you to be authorized to register for and use our Services without parental approval). In addition to being of the minimum required age to use our Services under applicable law, if you are not old enough to have authority to agree to our Terms in your country or territory, your parent or guardian must agree to our Terms on your behalf. Please ask your parent or guardian to read these Terms with you.
          {"\n\n"}Devices And Software. You must provide certain devices, software, and data connections to use our Services, which we otherwise do not supply. In order to use our Services, you consent to manually or automatically download and install updates to our Services. You also consent to our sending you notifications via our Services from time to time, as necessary to provide our Services to you.
          {"\n\n"}Fees And Taxes. You are responsible for all carrier data plans, Internet fees, and other fees and taxes associated with your use of our Services.
        </Text>
      </ScrollView>
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={agree ? 'checked' : 'unchecked'}
          onPress={() => setAgree(!agree)}
          color={colors.secondary}
        />
        <Text style={styles.checkboxText}>I agree to the Terms and Conditions</Text>
      </View>
      <Button title="Continue" onPress={handleContinue} disabled={!agree} color={colors.secondary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    color:colors.secondary,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color:colors.secondary,
    fontFamily: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: colors.text,
    fontFamily:'regular',
    textAlign: 'justify',
  },
  sectionTitle: {
    fontSize: 18,
    color: colors.text,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 8,
  },
});
