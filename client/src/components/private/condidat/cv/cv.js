
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SidebarCandidat from '../../../layout/sidebarCondidat';
import Header from '../../../layout/header';
import styles from '../../../../styles/Username.module.css';
import extend from '../../../../styles/Profile.module.css'
import { useParams } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
  import { useFormik } from 'formik';
  import { ajoutCV } from './helperCV';
  import { updateCV } from './helperCV';
  import useFetch from '../../../../hooks/fetch.hook';
  import add from '../../../../assets/ajout.png'
  import { CVValidation } from './helperCV';
   import getCV  from './getCV';
const steps = ['Informations Générales', 'Expériences', 'Formations','Compétences'];

export default function CV() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [ajoutEXP, setajoutEXP] = React.useState(0);
  const [ajoutFormation, setajoutFormation] = React.useState(0);
  const [ajoutCompetence, setajoutCompetence] = React.useState(0);
  const [{ isLoading, apiData, serverError }] = useFetch();
  // const id=apiData?._id;
  const [cv, setCV] = getCV();
  //console.log(cv.telephone)
  const formik = useFormik({
    initialValues : {
      prenom:apiData?.firstName || '',
      nom:apiData?.lastName || '',
      telephone:cv?.telephone||"",
      mission:"",
      gmail:apiData?.email || '',
      linkedin:"",
       adress:"",
       profile:"",
       experience: [{
        date_debutExp:"",
        date_finExp: "",
        nom_post: "",
        nom_entreprice: "",
        descriptionExp: "",
      }],
      formation: [{
        date_debutForm:  "",
        date_finForm:"",
        titleForm:"",
        nom_ecole: "",
        descriptionForm:"",
      }],
      competences: [{
        competence: "",
        nb_experience: "",
      }],
      langue:[],
    },
     
     enableReinitialize: true,
    validate : CVValidation,
     validateOnBlur: false,
     validateOnChange: false,
     onSubmit : async values => {
       values = await Object.assign(values,{user:apiData?._id})
      
      

       let AjoutPromise = ajoutCV(values);
       
       toast.promise(AjoutPromise, {
         loading: 'Loading...',
         success : <b>CV Enregistrer...!</b>,
         error: <b>Could not add!</b>
       });
      }
     
   })
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  
 

  const handleStep = (step) => () => {
    setActiveStep(step);
  };
  
  const handleAjoutExp = (step) => () => {
    setajoutEXP(step+1);
    
  };
  const handleAjoutFormation = (step) => () => {
    setajoutFormation(step+1);
    
  };
  const handleAjoutCompetence = (step) => () => {
    setajoutCompetence(step+1);
    
  };

  

  

  let content;
  if (activeStep === 0) {
    content = (
      <div><h3 className='titrecv'>Informations Générales</h3>
      <div className='cardExperience'>
        
       <div className="divdate name flex w-3/4 gap-10">

       <input disabled required {...formik.getFieldProps('prenom')}  className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Prénom' />
       <input disabled required {...formik.getFieldProps('nom')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Nom' />
       <input  required {...formik.getFieldProps('telephone')} className={`${styles.textbox} ${extend.textbox}`} type="number" placeholder='Téléphone' />
       </div>
            <div className=" divdate name flex w-3/4 gap-10" id='divsub'>
            <input required {...formik.getFieldProps('mission')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Votre Mission' />
            <input disabled required {...formik.getFieldProps('gmail')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder="Gmail" />
            <input required {...formik.getFieldProps('linkedin')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder="Linkedin" />
             
      </div>
      <div className=" divdate name flex w-3/4 gap-10" id='divsub'>
      <input required {...formik.getFieldProps('adress')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder="Adresse" />
      </div>

      <div className=" divprofile name flex w-3/4 gap-10" id='divsub'>
      <textarea required {...formik.getFieldProps('profile')} id="textare" className={`${styles.textbox} ${extend.textbox}`}  type="text" placeholder='Profile' />
      </div>
      </div>
      </div>
    );
  }else if (activeStep === 1){
    content = (
      <div>
        <h3 className='titrecv'>Experiences</h3>
      <div className='cardExperience'>
       <div className="divdate name flex w-3/4 gap-10">
        <div >
       <label >Date de début</label>
       <input required {...formik.getFieldProps(`experience[${0}].date_debutExp`)}  className={`${styles.textbox} ${extend.textbox}`} type="date" placeholder='Date début' />
       </div>
       <div>
       <label >Date de fin</label>
       <input  required {...formik.getFieldProps(`experience[${0}].date_finExp`)} className={`${styles.textbox} ${extend.textbox}`} type="date" placeholder='Date fin' />
       </div>
           </div>
            <div className=" divdate name flex w-3/4 gap-10" id='divsub'>
            <input  required {...formik.getFieldProps(`experience[${0}].nom_post`)}  className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Intitulé de post' />
            <input required {...formik.getFieldProps(`experience[${0}].nom_entreprice`)}  className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder="Nom de l'entreprice" />
             
      </div>
      <div className=" divprofile name flex w-3/4 gap-10" id='divsub'>
      <textarea required {...formik.getFieldProps(`experience[${0}].descriptionExp`)} id="textare" className={`${styles.textbox} ${extend.textbox}`}  type="text" placeholder='Description' />
      </div>
      
      </div>
      {ajoutEXP >=1 && (
        <div className='cardExperience'>
        <div className="divdate name flex w-3/4 gap-10">
         <div >
        <label >Date de début</label>
        <input required {...formik.getFieldProps(`experience[${1}].date_debutExp`)}  className={`${styles.textbox} ${extend.textbox}`} type="date" placeholder='Date début' />
        </div>
        <div>
        <label >Date de fin</label>
        <input  required {...formik.getFieldProps(`experience[${1}].date_finExp`)} className={`${styles.textbox} ${extend.textbox}`} type="date" placeholder='Date fin' />
        </div>
            </div>
             <div className=" divdate name flex w-3/4 gap-10" id='divsub'>
             <input  required {...formik.getFieldProps(`experience[${1}].nom_post`)}  className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Intitulé de post' />
             <input required {...formik.getFieldProps(`experience[${1}].nom_entreprice`)}  className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder="Nom de l'entreprice" />
              
       </div>
       <div className=" divprofile name flex w-3/4 gap-10" id='divsub'>
       <textarea required {...formik.getFieldProps(`experience[${1}].descriptionExp`)} id="textare" className={`${styles.textbox} ${extend.textbox}`}  type="text" placeholder='Description' />
       </div>
       
       </div>
      )}
      {ajoutEXP >=2 && (
        <div className='cardExperience'>
        <div className="divdate name flex w-3/4 gap-10">
         <div >
        <label >Date de début</label>
        <input required {...formik.getFieldProps(`experience[${2}].date_debutExp`)}  className={`${styles.textbox} ${extend.textbox}`} type="date" placeholder='Date début' />
        </div>
        <div>
        <label >Date de fin</label>
        <input  required {...formik.getFieldProps(`experience[${2}].date_finExp`)} className={`${styles.textbox} ${extend.textbox}`} type="date" placeholder='Date fin' />
        </div>
            </div>
             <div className=" divdate name flex w-3/4 gap-10" id='divsub'>
             <input  required {...formik.getFieldProps(`experience[${2}].nom_post`)}  className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Intitulé de post' />
             <input required {...formik.getFieldProps(`experience[${2}].nom_entreprice`)}  className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder="Nom de l'entreprice" />
              
       </div>
       <div className=" divprofile name flex w-3/4 gap-10" id='divsub'>
       <textarea required {...formik.getFieldProps(`experience[${2}].descriptionExp`)} id="textare" className={`${styles.textbox} ${extend.textbox}`}  type="text" placeholder='Description' />
       </div>
       
       </div>
      )}
      {ajoutEXP >=3 && (
        <div className='cardExperience'>
        <div className="divdate name flex w-3/4 gap-10">
         <div >
        <label >Date de début</label>
        <input required {...formik.getFieldProps(`experience[${3}].date_debutExp`)}  className={`${styles.textbox} ${extend.textbox}`} type="date" placeholder='Date début' />
        </div>
        <div>
        <label >Date de fin</label>
        <input  required {...formik.getFieldProps(`experience[${3}].date_finExp`)} className={`${styles.textbox} ${extend.textbox}`} type="date" placeholder='Date fin' />
        </div>
            </div>
             <div className=" divdate name flex w-3/4 gap-10" id='divsub'>
             <input  required {...formik.getFieldProps(`experience[${3}].nom_post`)}  className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Intitulé de post' />
             <input required {...formik.getFieldProps(`experience[${3}].nom_entreprice`)}  className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder="Nom de l'entreprice" />
              
       </div>
       <div className=" divprofile name flex w-3/4 gap-10" id='divsub'>
       <textarea required {...formik.getFieldProps(`experience[${3}].descriptionExp`)} id="textare" className={`${styles.textbox} ${extend.textbox}`}  type="text" placeholder='Description' />
       </div>
       
       </div>
      )}
      </div>
    );
    
  }else if (activeStep === 2 ) {
    content = (
      <div>
        <h3 className='titrecv'>Formations</h3>
      <div className='cardExperience'>
      
       <div className="divdate name flex w-3/4 gap-10">
        <div >
       <label >Date de début</label>
       <input required {...formik.getFieldProps(`formation[${0}].date_debutForm`)} className={`${styles.textbox} ${extend.textbox}`} type="date" placeholder='Date to start' />
       </div>
       <div>
       <label >Date de fin</label>
       <input  required {...formik.getFieldProps(`formation[${0}].date_finForm`)} className={`${styles.textbox} ${extend.textbox}`} type="date" placeholder='Date fin' />
       </div>
           </div>
            <div className=" divdate name flex w-3/4 gap-10" id='divsub'>
            <input required {...formik.getFieldProps(`formation[${0}].titleForm`)} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Title de votre formation' />
            <input required {...formik.getFieldProps(`formation[${0}].nom_ecole`)} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder="Nom de l'établissement" />
             
      </div>
      <div className=" divprofile name flex w-3/4 gap-10" id='divsub'>
      <textarea required {...formik.getFieldProps(`formation[${0}].descriptionForm`)} id="textare" className={`${styles.textbox} ${extend.textbox}`}  type="text" placeholder='Description détaillée de votre formation' />
      </div>
      </div>
      {ajoutFormation >=1 && (
        <div className='cardExperience'>
        <div className="divdate name flex w-3/4 gap-10">
         <div >
        <label >Date de début</label>
        <input required {...formik.getFieldProps(`formation[${1}].date_debutForm`)} className={`${styles.textbox} ${extend.textbox}`} type="date" placeholder='Date to start' />
        </div>
        <div>
        <label >Date de fin</label>
        <input  required {...formik.getFieldProps(`formation[${1}].date_finForm`)} className={`${styles.textbox} ${extend.textbox}`} type="date" placeholder='Date fin' />
        </div>
            </div>
             <div className=" divdate name flex w-3/4 gap-10" id='divsub'>
             <input required {...formik.getFieldProps(`formation[${1}].titleForm`)} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Title de votre formation' />
             <input required {...formik.getFieldProps(`formation[${1}].nom_ecole`)} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder="Nom de l'établissement" />
              
       </div>
       <div className=" divprofile name flex w-3/4 gap-10" id='divsub'>
       <textarea required {...formik.getFieldProps(`formation[${1}].descriptionForm`)} id="textare" className={`${styles.textbox} ${extend.textbox}`}  type="text" placeholder='Description détaillée de votre formation' />
       </div>
       </div>
      )}
      {ajoutFormation >=2 && (
        <div className='cardExperience'>
        <div className="divdate name flex w-3/4 gap-10">
         <div >
        <label >Date de début</label>
        <input required {...formik.getFieldProps(`formation[${2}].date_debutForm`)} className={`${styles.textbox} ${extend.textbox}`} type="date" placeholder='Date to start' />
        </div>
        <div>
        <label >Date de fin</label>
        <input  required {...formik.getFieldProps(`formation[${2}].date_finForm`)} className={`${styles.textbox} ${extend.textbox}`} type="date" placeholder='Date fin' />
        </div>
            </div>
             <div className=" divdate name flex w-3/4 gap-10" id='divsub'>
             <input required {...formik.getFieldProps(`formation[${2}].titleForm`)} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Title de votre formation' />
             <input required {...formik.getFieldProps(`formation[${2}].nom_ecole`)} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder="Nom de l'établissement" />
              
       </div>
       <div className=" divprofile name flex w-3/4 gap-10" id='divsub'>
       <textarea required {...formik.getFieldProps(`formation[${2}].descriptionForm`)} id="textare" className={`${styles.textbox} ${extend.textbox}`}  type="text" placeholder='Description détaillée de votre formation' />
       </div>
       </div>
      )}{ajoutFormation >=3 && (
        <div className='cardExperience'>
        <div className="divdate name flex w-3/4 gap-10">
         <div >
        <label >Date de début</label>
        <input required {...formik.getFieldProps(`formation[${3}].date_debutForm`)} className={`${styles.textbox} ${extend.textbox}`} type="date" placeholder='Date to start' />
        </div>
        <div>
        <label >Date de fin</label>
        <input  required {...formik.getFieldProps(`formation[${3}].date_finForm`)} className={`${styles.textbox} ${extend.textbox}`} type="date" placeholder='Date fin' />
        </div>
            </div>
             <div className=" divdate name flex w-3/4 gap-10" id='divsub'>
             <input required {...formik.getFieldProps(`formation[${3}].titleForm`)} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Title de votre formation' />
             <input required {...formik.getFieldProps(`formation[${3}].nom_ecole`)} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder="Nom de l'établissement" />
              
       </div>
       <div className=" divprofile name flex w-3/4 gap-10" id='divsub'>
       <textarea required {...formik.getFieldProps(`formation[${3}].descriptionForm`)} id="textare" className={`${styles.textbox} ${extend.textbox}`}  type="text" placeholder='Description détaillée de votre formation' />
       </div>
       </div>
      )}
      </div>
    );
  }else if (activeStep === 3) {
    content = (
      <div><h3 className='titrecv'>Compétences</h3>
      <div className='cardExperience'>
       <div  className="divprofile name flex w-3/4 gap-10">
       <label >Langue</label>
       <select multiple required {...formik.getFieldProps('langue')} className={`${styles.textbox} ${extend.textbox}`} >
            
            <option value="Anglais">Anglais</option>
            <option value="Arabe">Arabe</option>
            <option value=" Français"> Français</option>
            <option value="Mandarin">Mandarin</option>
            <option value=" Hindi"> Hindi</option>
            <option value="Espagnol">Espagnol</option>
            <option value="Bengali">Bengali</option>
            <option value=" Russe"> Russe</option>
            <option value="Portugais">Portugais</option>
            <option value="AOurdou">AOurdou</option>
            <option value="Turc">Turc</option>
            
          </select>
             
      </div>
      <div className=" divcompetence">
        <div className=" name flex w-3/4 gap-10" id='divformation'>
          <p>Compétence:</p>
      <input required {...formik.getFieldProps(`competences[${0}].competence`)}  className={`${styles.textbox} ${extend.textbox}`}  type="text" placeholder="compétence " />
      <input required {...formik.getFieldProps(`competences[${0}].nb_experience`)}  className={`${styles.textbox} ${extend.textbox}`}  type="number" placeholder="nombre d'éxeperience" />
      </div>
      </div>
      {ajoutCompetence>=1 && (
        <div className=" divcompetence">
        <div className=" name flex w-3/4 gap-10" id='divformation'>
        <p>Compétence:</p>
      <input required {...formik.getFieldProps(`competences[${1}].competence`)}  className={`${styles.textbox} ${extend.textbox}`}  type="text" placeholder="compétence " />
      <input required {...formik.getFieldProps(`competences[${1}].nb_experience`)}  className={`${styles.textbox} ${extend.textbox}`}  type="number" placeholder="nombre d'éxeperience" />
      </div>
      </div>
      )}
      {ajoutCompetence>=2 && (
        <div className=" divcompetence">
        <div className=" name flex w-3/4 gap-10" id='divformation'>
          <p>Compétence:</p>
      <input required {...formik.getFieldProps(`competences[${2}].competence`)}  className={`${styles.textbox} ${extend.textbox}`}  type="text" placeholder="compétence " />
      <input required {...formik.getFieldProps(`competences[${2}].nb_experience`)}  className={`${styles.textbox} ${extend.textbox}`}  type="number" placeholder="nombre d'éxeperience" />
      </div>
      </div>
      )}
      {ajoutCompetence>=3 && (
        <div className=" divcompetence">
        <div className=" name flex w-3/4 gap-10" id='divformation'>
          <p>Compétence:</p>
      <input required {...formik.getFieldProps(`competences[${3}].competence`)}  className={`${styles.textbox} ${extend.textbox}`}  type="text" placeholder="compétence " />
      <input required {...formik.getFieldProps(`competences[${3}].nb_experience`)}  className={`${styles.textbox} ${extend.textbox}`}  type="number" placeholder="nombre d'éxeperience" />
      </div>
      </div>
      )}
      {ajoutCompetence>=4 && (
        <div className=" divcompetence">
        <div className=" name flex w-3/4 gap-10" id='divformation'>
          <p>Compétence:</p>
      <input required {...formik.getFieldProps(`competences[${4}].competence`)}  className={`${styles.textbox} ${extend.textbox}`}  type="text" placeholder="compétence " />
      <input required {...formik.getFieldProps(`competences[${4}].nb_experience`)}  className={`${styles.textbox} ${extend.textbox}`}  type="number" placeholder="nombre d'éxeperience" />
      </div>
      </div>
      )}
      </div>
      </div>
    );
  }
  return (
    <div className='displ flex'>
    <div>
   <SidebarCandidat/>
    </div>
    <div className='layout'>
    <Header/>
    <Toaster position='top-center' reverseOrder={false}></Toaster>
    <div className='cardcv'>
    <Box sx={{ width: '100%' }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
       
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
            <form className='py-1 mt-12' >
              {content}
              
              </form>
              {(activeStep === 1)&&(ajoutEXP <3) && (
              <button className="buttonajoutexp"  type='submit' onClick={handleAjoutExp(ajoutEXP)}>Ajouter Expérience</button>
              )}
              {(activeStep === 2)&&(ajoutFormation <3) && (
              <button className="buttonajoutexp"  type='submit' onClick={handleAjoutFormation(ajoutFormation)}>Ajouter Formation</button>
              )}
              {(activeStep === 3)&&(ajoutCompetence <4) && (
              <button className="buttonajoutexp"  type='submit' onClick={handleAjoutCompetence(ajoutCompetence)}>Ajouter Compétence</button>
              )}
              <button className="buttoncv"  type='submit' onClick={formik.handleSubmit}>Enregistrer</button>
            </Typography>
            
             
             
                
           
          </React.Fragment>
        
      </div>
    </Box>
    </div></div></div>
  );
}