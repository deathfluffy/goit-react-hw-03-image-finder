import PropTypes from 'prop-types';
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
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};