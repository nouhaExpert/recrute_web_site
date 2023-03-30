import mongoose from 'mongoose';
export const OffreSchema = new mongoose.Schema(
    {
        Entreprisname : { type: String, required: true },
        Offrename: { type: String, required: true },
        ITdomain: { type: String, required: true },
        Temp: { type: String, required: true },
        City: { type: String, required: true },
        MiniDescription: { type: String, required: true },
       Competance:{ type: String, required: true },
        DescriptionDetail: { type: String, required: true },
        user_cre:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        
},
);
const Offres = mongoose.model('Offres', OffreSchema);
export default Offres;
