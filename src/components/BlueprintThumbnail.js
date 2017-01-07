import React, {PropTypes} from 'react';
import Col from 'react-bootstrap/lib/Col';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import {Link} from 'react-router';
import FontAwesome from 'react-fontawesome';
import buildImageUrl from '../helpers/buildImageUrl';

const BlueprintThumbnail = ({
	id,
	imgurId,
	imgurType,
	title,
	numberOfFavorites,
}) =>
	<Col xs={6} sm={6} md={2}>
		<Link to={`/view/${id}`}>
			<Thumbnail src={buildImageUrl(imgurId, imgurType, 'b')}>
				<OverlayTrigger placement='bottom' overlay={<Tooltip id='thumbnail-title-tooltip'>{title}</Tooltip>}>
					<p className='truncate'>{title}</p>
				</OverlayTrigger>
				<p><FontAwesome name='heart' /> {numberOfFavorites}</p>
			</Thumbnail>
		</Link>
	</Col>;

BlueprintThumbnail.propTypes = {
	id               : PropTypes.string.isRequired,
	imgurId          : PropTypes.string.isRequired,
	imgurType        : PropTypes.string.isRequired,
	title            : PropTypes.string.isRequired,
	numberOfFavorites: PropTypes.number.isRequired,
};

export default BlueprintThumbnail;
