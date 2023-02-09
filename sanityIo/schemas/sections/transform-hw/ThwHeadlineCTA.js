import {SanitySectionTitlesEnum} from "./sectionTitles";

export default {
    name: 'transformHeadlineSection',
    title: SanitySectionTitlesEnum.HEADLINE,
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'contentText',
            title: 'Content Text',
            type: 'text',
        },
        {
            name: 'ctaButtonText',
            title: 'CTA Button Text',
            type: 'string'
        },
        {
            name: 'ctaButtonLink',
            title: 'CTA Button Link',
            type: 'string'
        }
    ],
    preview: {
        select: {
            title: 'name',
        },
    },
}



