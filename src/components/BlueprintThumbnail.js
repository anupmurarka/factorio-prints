import {faHeart}              from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon}      from '@fortawesome/react-fontawesome';
import {forbidExtraProps}     from 'airbnb-prop-types';
import PropTypes              from 'prop-types';
import React, {PureComponent} from 'react';
import Card                   from 'react-bootstrap/Card';
import OverlayTrigger         from 'react-bootstrap/OverlayTrigger';
import Tooltip                from 'react-bootstrap/Tooltip';
import {connect}              from 'react-redux';
import {Link}                 from 'react-router-dom';

import buildImageUrl            from '../helpers/buildImageUrl';
import {blueprintSummarySchema} from '../propTypes';
import * as selectors           from '../selectors';

class BlueprintThumbnail extends PureComponent
{
	static propTypes = forbidExtraProps({
		blueprintSummary: blueprintSummarySchema,
		myBlueprints    : PropTypes.objectOf(PropTypes.bool.isRequired).isRequired,
		myFavoritesKeys : PropTypes.objectOf(PropTypes.bool.isRequired).isRequired,
	});

	render()
	{
		const {blueprintSummary, myFavoritesKeys, myBlueprints} = this.props;

		const {key, title, imgurId, imgurType, numberOfFavorites} = blueprintSummary;

		const isFavorite = myFavoritesKeys[key] === true;
		const isMine     = myBlueprints[key] === true;

		const tooltip  = (
			<Tooltip>
				{title}
			</Tooltip>
		);
		const imageUrl = buildImageUrl(imgurId, imgurType, 'b');

		const mineStyle     = isMine ? 'text-warning' : 'text-default';
		const favoriteStyle = isFavorite ? 'text-warning' : 'text-default';

		return (
			<div className='col-auto p-0 mt-2'>
				<Card className='mb-2 mr-2' style={{width: '14rem', backgroundColor: '#1c1e22'}}>
					<Link to={`/view/${key}`}>
						<Card.Img variant='top' src={imageUrl} />
					</Link>
					<p className='truncate p-1'>
						{`${numberOfFavorites}`}
						<span className={favoriteStyle}>
							{/* TODO: This heart should be a toggle button */}
							<FontAwesomeIcon icon={faHeart} className='text-error' />
						</span>
						{'  '}
						<OverlayTrigger placement='bottom' overlay={tooltip}>
							<Link to={`/view/${key}`}>
								<span className={mineStyle}>
									{title}
								</span>
							</Link>
						</OverlayTrigger>
					</p>
				</Card>
			</div>
		);
	}
}

const mapStateToProps = storeState => ({
	myBlueprints   : selectors.getMyBlueprints(storeState),
	myFavoritesKeys: selectors.getMyFavoritesKeys(storeState),
});

export default connect(mapStateToProps, {})(BlueprintThumbnail);
