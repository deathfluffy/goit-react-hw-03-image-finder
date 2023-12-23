import propTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem  ({ tags, preview, largeImage, onClick })  {
  return (
   <li className={css.ImageGalleryItem}>
      <img
      className={css.ImageGalleryItemImg}
        src={preview}
        alt={tags}
        onClick={() => {
          onClick(largeImage);
        }}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  largeImage: propTypes.string.isRequired,
  tags: propTypes.string.isRequired,
  preview: propTypes.string.isRequired,
  onClick: propTypes.func,
};