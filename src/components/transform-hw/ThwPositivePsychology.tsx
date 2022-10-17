import React, {FunctionComponent} from 'react'
import {makeStyles, Theme} from '@material-ui/core/styles'
import {Button, Grid, Typography, useMediaQuery} from '@material-ui/core'
import {urlFor} from '../abReplica/static-pages/cmsStaticPagesClient'
import {ThwPositivePsychologySectionType} from "../BlockContentTypes";
import TransformHWTheme from "../../theme/transform-hw/TransformHWTheme";
import {Check} from "@material-ui/icons";
import MediaQueries from "../layout/MediaQueries";

export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        minHeight: '521px',
        backgroundColor: theme.palette.background.paper,
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5)
    },
    contentBullets: {
        // border: "1px solid black"
        marginBottom: theme.spacing(5)
    }
}))


interface IProps {
    sectionData: ThwPositivePsychologySectionType
}

const PositivePsychologySection: FunctionComponent<IProps> = (props) => {
    const classes = useStyles(TransformHWTheme)
    const mdUp = useMediaQuery(MediaQueries.mdUp)
    return (
        <Grid container item className={classes.root} xs={11}>
            <Grid container item justifyContent='space-between' spacing={4}>
                <Grid item xs={12} md={7} lg={8} container direction='column' spacing={2}>
                    <Grid container item>
                        <Grid item container>

                            <Typography variant='body1'
                                        style={{fontStyle: "italic"}}>{props.sectionData.superTitle}</Typography>
                        </Grid>
                        <Grid container item wrap='nowrap'>

                        <Grid item>
                            <Typography variant='h4'
                                        color='secondary'
                                        display='inline' noWrap>{props.sectionData.contentTitle}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant='h3'
                                        color='primary' display='inline' style={{letterSpacing:"-.25em"}}>____</Typography>
                        </Grid>
                        </Grid>
                    </Grid>
                    <Grid item container>
                        <Typography variant='body1'
                                    color='secondary'>{props.sectionData.contentText}</Typography>
                    </Grid>
                    <Grid container item>
                        <Grid item container className={classes.contentBullets} spacing={1}>
                            {props.sectionData.contentBullets.map((reason: string, index: number) => {
                                return <Grid key={index} container item xs={6}>
                                    <Grid container item>
                                        <Grid item xs={2}><Check color='primary'/></Grid>
                                        <Grid item xs={10}>
                                            <Typography>{reason}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            })}
                        </Grid>
                    </Grid>
                    <Grid container item>
                        <Button variant='contained' color='primary'
                                href={props.sectionData.ctaButtonLink ?? ''} style={{color: "white"}}>
                            {props.sectionData.ctaButtonText}
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={5} lg={4} container justifyContent='flex-end' alignContent='center' alignItems='center'>
                    <Grid item style={{overflow: "hidden"}}>
                        <img alt={props.sectionData.imageSrcAltText}

                             src={urlFor(props.sectionData.imageSrc).width(mdUp ? 370 : 900).height(465).url() ?? ''}/>

                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default PositivePsychologySection