import api from '../config/api';
import Request from '../helper/Request';

const NOTICE = [
  {
    title: 'EYE EXAMINATION & EYE-CHECK REQUIREMENT (CONTACT LENS)',
    description: 'Disposable contact lenses are medical devices in Singapore and patients are subjected to a mandatory eye examination according to the local regulation (Professional Practice Guideline for Optometrist E 4.1.2.) A mandatory eye examination with contact lens fitting required for all new contact lenses wearer irregardless existing or new customer of W OPTICS. To be done with our certified optometrist at any W OPTICS stores.'
  },
  {
    title: 'CUSTOMIZED ORDER ARE NOT REFUNDABLE NOR EXCHANGABLE (PRESCRIPTIVE LENSES)',
    description: 'All orders on prescriptive lenses eg. frame and lenses purchase, are not eligible for any exchange or refund once it is delivered, as it is a customized made to order item. Warranty is not applicable to sale items. We recommend self-collection in the store. Prescriptive lenses are medical devices in Singapore and patients are subjected to a mandatory eye examination according to the local regulation (Professional Practice Guideline for Optometrist E 4.1.2.)'
  }
]

const get = async () => {
  try {
    const { data } = await Request.backend('GET', `${api.GET_FAQS}`);
    return data;
  } catch (err) {
    console.log('error Faq@get', err);
    return [];
  }
};

export default {
  NOTICE,
  get
};
