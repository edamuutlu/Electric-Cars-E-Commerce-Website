import { getServerSession } from "next-auth";
import User from "@/models/User";

export const findUserId = async () => {
    const session = await getServerSession();

  if (session) {
    const email = session.user?.email;

    if (email) {
      User.findOne({ email: email })
        .then(user => {
          if (user) {
            console.log('Kullanıcı bulundu, ID:', user._id);
            return user._id.toString();
          } else {
            console.log('Kullanıcı bulunamadı.');
          }
        })
        .catch(err => {
          console.error('Hata:', err);
        });
    } else {
      console.log('E-posta bilgisi bulunamadı.');
    }
  } else {
    console.log('Oturum bilgisi bulunamadı.');
  } 
}
