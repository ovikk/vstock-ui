import React from 'react'
import ImageUploading from 'react-images-uploading';
import styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';
import Camera from 'assets/camera.svg';
import SneakerPlaceholder from 'assets/sneaker_placeholder.svg';

const Images = ({ values, onImageUpload, onImageRemove }) => {
  const sources = Array.from({ length: 3 }).map(x => SneakerPlaceholder)

  for (let i = 0; i < sources.length; ++i) {
    if (!!values[i]) { sources[i] = values[i].image_url; }
  }

  return (
    <AddPhotoWrapper>
      {sources.map((src, index) => (
        <CustomImageWrapper key={`${src}_${index}`}>
          <CustomSneakerImage src={src} style={src === SneakerPlaceholder ? { transform: 'rotate(30deg)' } : {}} />
          {src !== SneakerPlaceholder && <DeleteButton onClick={() => onImageRemove(index)}><DeleteIcon /></DeleteButton>}
        </CustomImageWrapper>
      ))}

      <CameraWrapper onClick={onImageUpload}>
        <CameraIcon src={Camera} />
      </CameraWrapper>
    </AddPhotoWrapper>
  );
}

export const ImagesForm = ({ values, onChange }) => {
  const onChangeHandler = React.useCallback((imageList, addUpdateIndex) => {
    onChange(imageList)
  }, [onChange]);

  return (
    <ImageUploading
      multiple
      value={values}
      onChange={onChangeHandler}
      maxNumber={3}
      dataURLKey="image_url"
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) =>
        <Images values={imageList} onImageUpload={onImageUpload} onImageRemove={onImageRemove} />
      }
    </ImageUploading>
  )
}

ImagesForm.defaultProps = {
  values: [],
  onChange: () => {}
}

const AddPhotoWrapper = styled.div`
  height: 390px;
  width: 100px;
  margin: 0px 20px;
  display: flex;
  flex-direction: column;
`;

const CustomImageWrapper = styled.div`
  height: 100px;
  margin-bottom: 10px;
  width: 100%;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.darkBackground};
  position: relative;
`;

const CustomSneakerImage = styled.img`
  height: 90%;
  width: auto;
  max-width: 90%;
`;

const CameraWrapper = styled.div`
  height: 100px;
  width: 100%;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const CameraIcon = styled.img`
  height: auto;
  width: 60%;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  padding: 2px 0;
  cursor: pointer;

  >svg {
    color: #991616;
  }

  >svg:hover {
    color: #e12424;
  }
`;
