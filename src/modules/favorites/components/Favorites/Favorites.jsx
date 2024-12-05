import { useEffect, useState } from 'react';
import { TbHeartOff } from 'react-icons/tb';
import { toast } from 'react-toastify';
import defaultimg from '../../../../assets/images/header-man.png';
import {
  axiosInstance,
  FAVORITES_URLS,
  IMAGE_URL,
} from '../../../../services/urls/urls';
import Header from '../../../shared/components/Header/Header';
import NoData from '../../../shared/components/NoData/NoData';

export default function Favorites() {
  const [favoritesList, setFavoritesList] = useState([]);

  const getFavorites = async () => {
    try {
      let response = await axiosInstance.get(FAVORITES_URLS.GET_FAVORITES);
      console.log(response.data.data);
      setFavoritesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFavorites = async (id) => {
    try {
      await axiosInstance.delete(FAVORITES_URLS.DELETE_FAVORITES(id));
      toast.success('Deleted Successfully');
      getFavorites();
    } catch (error) {
      console.log(error);
      toast.error('Error deleting item');
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <>
      <div>
        <Header
          title={'Favorite Items'}
          description={
            'Manage your favorite items here. You can delete items as needed.'
          }
        />
      </div>

      <div className="my-5">
        {favoritesList.length > 0 ? (
          <div className="row ">
            {favoritesList.map((favItem, index) => (
              <div className="col-lg-4 col-md-6 col-12 gy-4" key={index}>
                <div className="shadow-lg p-4 rounded" style={{ width: '80%' }}>
                  <div className="d-flex justify-content-center align-items-center mb-4">
                    <img
                      src={
                        favItem.recipe.imagePath
                          ? `${IMAGE_URL}/${favItem.recipe.imagePath}`
                          : defaultimg
                      }
                      alt={favItem.recipe.name || 'Recipe Image'}
                      style={{
                        width: '90%',
                        objectFit: 'cover',
                        borderRadius: '10px',
                      }}
                    />
                  </div>
                  <div className="d-flex justify-content-between gap-2 align-items-center px-4">
                    <div>
                      <h5 className="fw-bold">{favItem.recipe.name}</h5>
                      <p className="text-muted">{favItem.recipe.description}</p>
                    </div>
                    <div>
                      <TbHeartOff
                        onClick={() => deleteFavorites(favItem.id)}
                        className=" fs-3 text-danger "
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
}
