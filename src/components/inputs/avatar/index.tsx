import React, { useState } from 'react';
import './style.sass';
import PlusIcon from '../../../assets/images/add.svg'
import EditIcon from '../../../assets/images/edit.svg'
import ProfileIcon from '../../../assets/images/profileFill.svg'
import LoadIcon from '../../../assets/images/loading-outlined.svg'

interface AvatarInputProps {
  defaultPhoto?: string;
}

export const AvatarInput: React.FC<AvatarInputProps> = ({ defaultPhoto }) => {
    const [photo, setPhoto] = useState(defaultPhoto);
    const [editing, setEditing] = useState(defaultPhoto ? true : false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
      
        if (file) {
          setIsLoading(true);
      
          const reader = new FileReader();
      
          reader.onloadend = () => {
            setPhoto(reader.result as string);
            setEditing(true);
            setIsLoading(false);
            setError(false);
          };
      
          reader.onerror = () => {
            setIsLoading(false);
            setError(true); 
          };
      
          reader.readAsDataURL(file);
        }
    };
      

    return (
        <div className="avatar-input-content">
        <div className='photo-area'>
            {isLoading && <img className="load-icon" src={LoadIcon} alt="" />}
            {error && <p className="error">Erro ao carregar imagem</p> }

            {photo && !isLoading && !error && <img className="user-photo" src={photo} alt="" />}
            {!photo && !isLoading && !error && <img className="user-icon" src={ProfileIcon} alt="" />}
        </div>
        <label className="button">
          <input type="file" accept="image/*" onChange={handleInputChange} name="foto" />
          {editing ? 
            <img src={EditIcon} alt="" />
          : 
            <img src={PlusIcon} alt="" />  
          }
        </label>

        </div>
    );
};
