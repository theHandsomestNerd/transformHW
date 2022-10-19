import React, {FunctionComponent, useEffect, useState} from 'react'
import {makeStyles, Theme} from "@material-ui/core/styles"
import {Button, Grid, InputAdornment, Link, TextField, Typography, useMediaQuery, withStyles} from "@material-ui/core";
import {AccountCircle, Email, Facebook, LinkedIn, Message, Phone, Twitter, YouTube} from "@material-ui/icons";
import TransformHWTheme from "../../theme/transform-hw/TransformHWTheme";
import {urlFor} from "../abReplica/static-pages/cmsStaticPagesClient";
import {ThwContactUsSectionType} from "../BlockContentTypes";
import clsx from "clsx";
import {useThwStyles} from "../layout/Styles";
import MediaQueries from "../layout/MediaQueries";

export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100vw',
        // minHeight: '100vh',
        backgroundColor: '#1f1f1f',
        color: "#FAFAFA",
    },
    header: {
        fontWeight: 800,
        letterSpacing: '10px',
        lineHeight: 1.4,
        fontSize: '30px',
        textTransform: 'uppercase'
    },
    headerAccent: {
        display: 'inline-block',
        marginLeft: theme.spacing(1)
    },
    formContainer: {
        // margin: 'auto',
        // height: '500px',
        // backgroundColor: '#313131',
        // boxShadow: '11px 10px 38px rgb(0 0 0 / 38%)',
        zIndex: 2
    },
    inputAdornmentContainer: {
        marginTop: theme.spacing(1),
        zIndex: 3
    },
    inputAdornmentTextBlockContainer: {
        position: "relative",
        top: -34,
        zIndex: 3
    },
    formTitle: {
        marginBottom: theme.spacing(1)
    },
    socialMediaContainer: {
        marginTop: theme.spacing(1)
    },
    lhsContainer: {
        // width: "500px",
        // height: "650px"
    },
    formInput: {
        color: "white",
    },
    sectionTitle: {
        fontWeight: 800,
        color: "white !important"
    }
}))

const StyledTextField = withStyles({
    root: {
        transition: "all 0.3s ease-in-out",
        "& label": {
            // display: "inline-block",
            // fontSize: "16px",
            // fontWeight: 700,
            position: "relative",
            top: "8px",
            left: "-14px",
        },
        "& legend": {
            maxWidth: "0px"
        },
        "& input": {
            zIndex: 2
        },
        "& textarea": {
            zIndex: 2
        },
        "& fieldset": {
            backgroundColor: "#292929",
        },
        "& .MuiOutlinedInput-root": {
            borderColor: `${TransformHWTheme.palette.primary.main} !important`,
            "&.Mui-focused": {
                borderColor: `${TransformHWTheme.palette.primary.main} !important`,
                "&:hover": {
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: `${TransformHWTheme.palette.primary.main} !important`
                    }
                }
            },
            "&:hover": {
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: `#212121 !important`
                }
            }
        }
    }
})(TextField);

export type ContactUsProps = {
    sectionData: ThwContactUsSectionType
}

const ContactUs: FunctionComponent<ContactUsProps> = (props) => {
    const classes = useStyles(TransformHWTheme)
    const globalClasses = useThwStyles({})
    const mdDown = useMediaQuery(MediaQueries.smDown)
    console.log("contact", props.sectionData)

    const [alignment, setAlignment] = useState<any>('right')
    const [justifyContent, setJustifyContent] = useState<any>('flex-end')

    useEffect(()=>{
        if(mdDown){
            setAlignment('center')
            setJustifyContent('center')
        } else {
            setAlignment('right')
            setJustifyContent('flex-end')
        }
    })

    return (
        <Grid container item className={classes.root} style={{
            backgroundSize: "cover",
            position: "relative",
            minHeight: "145px",
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url(${urlFor(props.sectionData.bgImageSrc).url()})`
        }}>
            <Grid container item
                  className={clsx(globalClasses.fullSectionOverlay)}/>
                <Grid spacing={mdDown?0:4} container item style={{        padding: TransformHWTheme.spacing(0, 8,6)
                }}>
                    <Grid container item md={6}>
                        <Grid container direction="column" item className={classes.lhsContainer}
                              justifyContent='center' style={{zIndex: 2}}>
                            <Grid container item justifyContent={justifyContent}>
                                <Typography variant="h2" align={alignment}> {props.sectionData.lhsTitle}</Typography>
                            </Grid>
                            <Grid container item justifyContent={justifyContent}>
                                <Typography gutterBottom variant='h4'
                                            color='primary' display='inline'
                                            style={{
                                                letterSpacing: "-.25em",
                                                paddingBottom: "16px",
                                                lineHeight: .2
                                            }}>________</Typography>
                            </Grid>
                            <Grid container item justifyContent={justifyContent}>
                                <Grid item xs={8}>
                                    <Typography style={{wordWrap: "break-word"}} align={alignment}>
                                        {props.sectionData.lhsContentText}</Typography>
                                </Grid>
                            </Grid>
                            {/*<Grid container item spacing={1}>*/}
                            {/*  <Grid item>*/}
                            {/*    <Typography ><MailOutline/></Typography>*/}
                            {/*  </Grid>*/}
                            {/*  <Grid item>*/}
                            {/*    <Typography className={classes.sectionTitle}>Address:</Typography>*/}
                            {/*    <Typography >{props.address}</Typography>*/}
                            {/*  </Grid>*/}
                            {/*</Grid>*/}
                            {/*<Grid container item spacing={1}>*/}
                            {/*  <Grid item>*/}
                            {/*    <Typography ><PhoneOutlined/></Typography>*/}
                            {/*  </Grid>*/}
                            {/*  <Grid item>*/}
                            {/*    <Typography  className={classes.sectionTitle}>Phone:</Typography>*/}
                            {/*    <Typography >{props.phone}</Typography>*/}
                            {/*  </Grid>*/}
                            {/*</Grid>*/}
                            {/*<Grid item>*/}
                            {/*  <Typography ><EmailOutlined/></Typography>*/}
                            {/*</Grid>*/}
                            {/*    <Grid container item>*/}

                            {/*      <Typography  className={classes.sectionTitle}>Email:</Typography>*/}
                            {/*      <Typography >{props.email}</Typography>*/}
                            {/*    </Grid>*/}
                            <Grid container item>
                                <Grid container item justifyContent={justifyContent} className={classes.socialMediaContainer}
                                      spacing={1}>
                                    {props.sectionData?.facebook && <Grid item>
                                        <Typography>
                                            <Link href={"http://facebook.com/" + props.sectionData.facebook}><Facebook
                                                fontSize="large"/></Link>
                                        </Typography>
                                    </Grid>}
                                    {props.sectionData?.twitter && <Grid item>
                                        <Typography>
                                            <Link href={"http://twitter.com/" + props.sectionData.twitter}><Twitter
                                                fontSize="large"/></Link>
                                        </Typography>
                                    </Grid>}
                                    {props.sectionData?.linkedIn && <Grid item>
                                        <Typography>
                                            <Link href={"http://linkedIn.com/" + props.sectionData.linkedIn}><LinkedIn
                                                fontSize="large"/></Link>
                                        </Typography>
                                    </Grid>}
                                    {props.sectionData?.youtube && <Grid item>
                                        <Typography>
                                            <Link href={"http://youtube.com/" + props.sectionData.youtube}><YouTube
                                                fontSize="large"/></Link>
                                        </Typography>
                                    </Grid>}
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid container item xs={11} md={6} justifyContent="center">
                        <Grid container item className={classes.formContainer} spacing={1}>
                            {/*<Grid container item justifyContent="center" className={classes.formTitle}>*/}
                            {/*    <Typography variant="h3" className={classes.header}>*/}
                            {/*        Get in*/}
                            {/*        <Typography component="span" variant="h3"*/}
                            {/*                    className={`${classes.header} ${classes.headerAccent}`}*/}
                            {/*                    color="primary">*/}
                            {/*            Touch*/}
                            {/*        </Typography>*/}
                            {/*    </Typography>*/}
                            {/*</Grid>*/}
                            <Grid container item style={{marginTop:TransformHWTheme.spacing(8)}}>
                                <StyledTextField
                                    fullWidth
                                    id="contact-name-input"
                                    label={<Typography variant='body2' style={{color: "white"}}>Name</Typography>}
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Typography className={classes.inputAdornmentContainer}>
                                                    <AccountCircle/>
                                                </Typography>
                                            </InputAdornment>
                                        ),
                                        className: classes.formInput
                                    }}
                                />
                            </Grid>
                            <Grid container item>
                                <StyledTextField
                                    fullWidth
                                    id="contact-email-input"
                                    label={<Typography variant='body2' style={{color: "white"}}>Email</Typography>}
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Typography className={classes.inputAdornmentContainer}>
                                                    <Email/>
                                                </Typography>
                                            </InputAdornment>
                                        ),
                                        className: classes.formInput
                                    }}
                                />
                            </Grid>
                            <Grid container item>
                                <StyledTextField
                                    fullWidth
                                    id="contact-phone-input"
                                    label={<Typography variant='body2' style={{color: "white"}}>Phone</Typography>}
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Typography
                                                    className={classes.inputAdornmentContainer}><Phone/></Typography>
                                            </InputAdornment>
                                        ),
                                        className: classes.formInput
                                    }}
                                />
                            </Grid>
                            <Grid container item>
                                <StyledTextField
                                    fullWidth
                                    id="contact-message-input"
                                    label={<Typography variant='body2' style={{color: "white"}}>Message</Typography>}
                                    variant="outlined"
                                    multiline
                                    rows="4"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Typography

                                                    className={classes.inputAdornmentTextBlockContainer}>
                                                    <Message/>
                                                </Typography>
                                            </InputAdornment>
                                        ),
                                        className: classes.formInput
                                    }}
                                />
                            </Grid>
                            <Grid container item alignItems="center" justifyContent="center" style={{marginTop: TransformHWTheme.spacing(4)}}>
                                <Button color="primary" variant="contained"><Typography variant="button">Send
                                    Button</Typography></Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
        </Grid>
    )
}

export default ContactUs