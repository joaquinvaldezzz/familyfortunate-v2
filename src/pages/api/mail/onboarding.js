import { toast } from 'react-hot-toast'
import { capitalizeFirstLetter } from '../../../utils/globalFnx'
import { sendMailFnx } from '../sendMailFnx'

const onboarding = async (req, res) => {
  //const ownerEmail = 'member@familywise.us'
  const ownerEmail = 'jerichoyestares2001@gmail.com'
  try {
    const user = req.body
    //Check if the planType is Free-Trial
    if (user.planType === 'Free-Trial') {
      // Send onboarding email for Free-Trial users
      const onboardingSubject =
        'Ready to get started, ' + capitalizeFirstLetter(user.firstname) + '?'
      const onboardingTemplate = 'FreeTrial/onboarding-1.html'

      const onboardingEmailConfig = {
        subject: onboardingSubject,
        template: onboardingTemplate,
        param: { name: capitalizeFirstLetter(user.firstname) },
        to: user.email,
      }

      await sendMailFnx(onboardingEmailConfig)
    } else if (user.planType === 'Your-Life-In-A-Book') {
      // Send onboarding email for Your-Life-In-A-Book users
      const onboardingSubject =
        'Ready to get started, ' + capitalizeFirstLetter(user.firstname) + '?'
      const onboardingTemplate = 'YourLifeInABook/onboarding-1.html'
      const notifyOwner = 'Alert/myself-yliab.html'
      const notifyOwnerGift = 'Alert/gift-yliab.html'

      const onboardingEmailConfig = {
        subject: onboardingSubject,
        template: onboardingTemplate,
        param: { name: capitalizeFirstLetter(user.firstname) },
        to: user.email,
      }

      try {
        if (user.bookReceiver === 'myself') {
          const notifyOwnerEmailConfig = {
            subject: onboardingSubject,
            template: notifyOwner,
            param: {
              name: capitalizeFirstLetter(user.firstname),
              email: user.email,
              type: user.planType,
              receiver: user.bookReceiver,
            },
            to: ownerEmail,
          }
          await sendMailFnx(notifyOwnerEmailConfig)
        } else if (user.bookReceiver === 'gift') {
          const notifyOwnerEmailGiftConfig = {
            subject: onboardingSubject,
            template: notifyOwnerGift,
            param: {
              name: capitalizeFirstLetter(user.firstname),
              email: user.email,
              r_email: user.giftSender,
              occasion: user.giftOccasion,
              s_msg_gift: user.giftSalutation,
              msg_gift: user.giftMessage,
              type: user.planType,
              receiver: user.bookReceiver,
              gift_date: new Date(user.giftDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }),
            },
            to: ownerEmail,
          }
          await sendMailFnx(notifyOwnerEmailGiftConfig)
        }
      } catch (err) {
        toast.error(err)
      }

      await sendMailFnx(onboardingEmailConfig)
    } else if (user.planType === 'Photo-Based-Book') {
      // Send onboarding email for Photo-Based-Book users
      const onboardingSubject =
        'Ready to get started, ' + capitalizeFirstLetter(user.firstname) + '?'
      const onboardingTemplate = 'PhotoBasedBook/onboarding-1.html'
      const notifyOwner = 'Alert/myself-pbb.html'
      const notifyOwnerGift = 'Alert/gift-pbb.html'

      const onboardingEmailConfig = {
        subject: onboardingSubject,
        template: onboardingTemplate,
        param: { name: capitalizeFirstLetter(user.firstname) },
        to: user.email,
      }

      try {
        if (user.bookReceiver === 'myself') {
          const notifyOwnerEmailConfig = {
            subject: onboardingSubject,
            template: notifyOwner,
            param: {
              name: capitalizeFirstLetter(user.firstname),
              email: user.email,
              type: user.planType,
              receiver: user.bookReceiver,
            },
            to: ownerEmail,
          }
          await sendMailFnx(notifyOwnerEmailConfig)
        } else if (user.bookReceiver === 'gift') {
          const notifyOwnerEmailGiftConfig = {
            subject: onboardingSubject,
            template: notifyOwnerGift,
            param: {
              name: capitalizeFirstLetter(user.firstname),
              email: user.email,
              r_email: user.giftSender,
              occasion: user.giftOccasion,
              s_msg_gift: user.giftSalutation,
              msg_gift: user.giftMessage,
              type: user.planType,
              receiver: user.bookReceiver,
              gift_date: new Date(user.giftDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }),
            },
            to: ownerEmail,
          }
          await sendMailFnx(notifyOwnerEmailGiftConfig)
        }
      } catch (err) {
        toast.error(err)
      }

      await sendMailFnx(onboardingEmailConfig)
    } else {
      //params { subject, template, param, to }
      const subject =
        user.bookReceiver === 'gift'
          ? `${capitalizeFirstLetter(user.firstname)}, Here's your gift!`
          : `Ready to get started, ${capitalizeFirstLetter(user.firstname)}?`
      const params =
        user.bookReceiver === 'gift'
          ? {
              name: capitalizeFirstLetter(user.firstname),
              totalQuestions: user.planType === 'Classic' ? 100 : 500,
              occasion: user.giftOccasion,
              salutation: user.giftSalutation,
              token: user.token,
              sender: user.giftSender,
              message: user.giftMessage,
            }
          : {
              name: capitalizeFirstLetter(user.firstname),
              totalQuestions: user.planType === 'Classic' ? 100 : 500,
            }
      const template =
        user.bookReceiver === 'gift'
          ? 'Both/onboarding-1-gift.html'
          : user.planType + '/onboarding-1.html'

      const emailConfig = {
        subject: subject,
        template: template,
        param: params,
        to: user.email,
      }

      // Send the email
      await sendMailFnx(emailConfig)
    }

    return res.status(200).json({ message: 'Email successfully sent!' })
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

export default onboarding
