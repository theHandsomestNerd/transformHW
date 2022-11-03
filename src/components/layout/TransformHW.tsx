import {
    CircularProgress,
    CssBaseline,
    Grid,
    Link,
    makeStyles,
    MuiThemeProvider,
    Theme,
    Typography
} from '@material-ui/core'
import React, {FunctionComponent, Suspense, useState} from 'react'
import sanityClient from '../../sanityClient'
import BlockContentLayoutContainer from '../BlockContentLayoutContainer'
import {useParams} from 'react-router-dom'
import MetaTagsComponent from '../aft-marketing/MetaTags'
import cmsClient from '../block-content-ui/cmsClient'
import TransformHWTheme from "../../theme/transform-hw/TransformHWTheme";
import UnderConstruction from "./under-construction/UnderConstruction";
import {SanityTransformHwHomePage} from "../../common/sanityIo/Types";
import groqQueries from "../../utils/groqQueries";
import {useQuery} from "react-query";
import {useThwStyles} from "./Styles";
import FourOhFour from "./error/FourOhFour";
import ThwFooter from "../transform-hw/footer/ThwFooter";
import ThwHeader from "../transform-hw/header/ThwHeader";
import {useScrollPosition} from "../../utils/useScrollPosition";
import {redirect} from "react-router";
import {RoutesEnum} from "../../App";
import Logo from "../transform-hw/logo/Logo";
import LoadingPage from "./loading-page/LoadingPage";
import PsychologyTodaySeal from "../transform-hw/psychology-today-stamp/PsychologyToday";
import transformHWTheme from "../../theme/transform-hw/TransformHWTheme";


export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100vw',
        // backgroundColor: "whitesmoke"
    }
}))

export type AppLayoutProps = {}

const TransformHW: FunctionComponent<AppLayoutProps> = (props) => {
    const classes = useStyles(TransformHWTheme)
    const globalClasses = useThwStyles(TransformHWTheme)
    const [homePage, setHomePage] = React.useState<SanityTransformHwHomePage | undefined>()

    const urlParams: { pageSlug?: string } = useParams()

    const {isLoading, isError, data, isRefetching} = useQuery(
        ['fetchPageBySlug'],
        async () => {
            const pageSlug = urlParams.pageSlug
            if (pageSlug) {
                return sanityClient
                    .fetch(
                        `*[slug.current == $pageSlug]{
          ${groqQueries.HOMEPAGE}
       }`, {pageSlug})
                    .then((result) => {
                        if (result.length === 0) {
                            redirect(RoutesEnum.ERROR)
                        }
                        return result
                    }).catch(() => {
                        redirect(RoutesEnum.ERROR)
                    })
            } else {
                redirect(RoutesEnum.COMING_SOON)
            }
        }
    );

    React.useEffect(() => {
        if (data)
            setHomePage(data[0])
    }, [data])

    const [realizedContent, setRealizedContent] = React.useState<any[]>([])

    React.useEffect(() => {
        // These Content sections are references and must be retrieved from Sanity
        homePage?.pageContent?.content?.map && Promise.all(homePage?.pageContent?.content.map((contentBlock: any) => {
            return cmsClient.fetchRef(contentBlock).then((response) => {
                return response
            })
        })).then(contentRealized => {
            setRealizedContent(contentRealized)
        })
    }, [homePage])
    const [hideOnScroll, setHideOnScroll] = useState(true)

    useScrollPosition(({prevPos, currPos}: any) => {
        const isShow = currPos.y > -100
        if (isShow !== hideOnScroll) setHideOnScroll(isShow)
    }, [hideOnScroll])

    const [isHeaderOrFooterLoading, setIsHeaderOrFooterLoading] = useState(false)

    const PageLayout = () => {
        return <Grid container direction='column' className={classes.root}>
            <Grid item>
                <ThwHeader  menuSlug='transform-hw-header' isOpaque={hideOnScroll}/>
            </Grid>

            <Grid container item>
                <BlockContentLayoutContainer
                    content={realizedContent}/>
            </Grid>
            <Grid item>
                <ThwFooter footerMenuSlug='transform-hw-footer' homePage={homePage}/>
            </Grid>
            <Grid container item
                  alignContent='center'
                  alignItems='stretch'
                  style={{backgroundColor: "white", position: "static", bottom: 0, padding: transformHWTheme.spacing(1)}}
                  justifyContent='space-between'>
                <Grid item xs={8} container alignContent='center' style={{paddingTop: transformHWTheme.spacing(.75)}}>
                    <Link href='https://thehandsomestnerd.com' color='textPrimary' variant='subtitle2'>© 2022 TheHandsomestNerd, LLC.</Link>
                </Grid>
                <Grid item justifyContent='flex-end' xs={4} container alignContent='center'>
                    <PsychologyTodaySeal />
                </Grid>
            </Grid>
        </Grid>
    }


    const PageContents = () => {
        if (isLoading || (realizedContent.length < 7 && !homePage?.underConstructionPageRef) || isRefetching)
            return <LoadingPage/>

        if (!homePage?.isUnderConstruction) {
            return <PageLayout></PageLayout>
        } else if (homePage.underConstructionPageRef) {
            return <UnderConstruction underConstructionPageRef={homePage.underConstructionPageRef}
                                      email={homePage?.email}/>
        }

        if (isError) {
            return <FourOhFour/>
        }

        return <FourOhFour/>
    }

    return (<MuiThemeProvider theme={TransformHWTheme}>
            <CssBaseline/>
            <MetaTagsComponent structuredData={homePage?.structuredData && homePage.structuredData[0]}
                               title={homePage?.title ?? ''}
                               description={homePage?.description ?? ''} imgSrc={homePage?.metaImage}/>
            <PageContents/>
        </MuiThemeProvider>)
}

export default TransformHW