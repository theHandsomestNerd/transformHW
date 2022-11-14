import React, {FunctionComponent} from 'react'
import {makeStyles, Theme} from '@material-ui/core/styles'
import {Grid, Typography, useMediaQuery} from '@material-ui/core'
import {urlFor} from '../block-content-ui/static-pages/cmsStaticPagesClient'
import {ThwMottoSectionType} from "../BlockContentTypes";
import {Parallax} from 'react-parallax';
import {useThwStyles} from "./pages/Styles";
import clsx from "clsx";
import mediaQueries from "../../utils/mediaQueries";
import TransformHWTheme from "../../theme/transform-hw/TransformHWTheme";

export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: '430px',
        // backgroundColor: theme.palette.background.paper,
        paddingBottom: theme.spacing(5)
    },
    contentBullets: {
        // border: "1px solid black"
        marginBottom: theme.spacing(5)
    }
}))


interface IProps {
    sectionData: ThwMottoSectionType
}

const ThwMottoSection: FunctionComponent<IProps> = (props) => {
    const globalClasses = useThwStyles(TransformHWTheme)
    const classes = useStyles()

    const smDown = mediaQueries.useSmDown()

    return (
        <Parallax blur={1} bgImage={urlFor(props.sectionData.parallaxImage).url() ?? undefined} bgImageAlt="the cat"
                  strength={600}>
            <Grid container item
                  className={clsx([globalClasses.fullSection, classes.root])}
                  style={{position: "relative", overflow: "hidden"}}>
                <Grid container item
                      className={clsx(globalClasses.fullSectionOverlay)}>
                </Grid>
                <Grid container justifyContent='center' alignItems='center' alignContent='center' item
                      style={{zIndex: 2, padding: "40px"}}>
                    <Typography variant='subtitle1' style={{color: '#FAFAFA'}} align='center'>
                        {props.sectionData.contentSuperTitle}
                    </Typography>
                    <Typography variant={smDown ? 'h3' : 'h2'} style={{color: '#FAFAFA'}} align='center'>
                        {props.sectionData.contentText}
                    </Typography>
                </Grid>
            </Grid>
        </Parallax>
    )
}

export default ThwMottoSection