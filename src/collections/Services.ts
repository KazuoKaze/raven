import { CollectionConfig } from 'payload'
import { formatSlug } from '../utilities/formatSlug'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) {
        return {
          status: {
            equals: 'published',
          },
        }
      }
      return true
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Service Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      admin: {
        description: 'Service URL path (e.g., "executive-protection")',
        position: 'sidebar',
      },
      index: true,
      hooks: {
        beforeValidate: [formatSlug('title')],
      },
      index: true,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    // Hero Section Configuration
    {
      name: 'heroSection',
      type: 'group',
      label: 'Hero Section',
      fields: [
        {
          name: 'tags',
          type: 'array',
          label: 'Tags',
          fields: [
            {
              name: 'tag',
              type: 'text',
              label: 'Tag Text',
              defaultValue: 'Service Tag',
            },
            {
              name: 'tagBackgroundColor',
              type: 'text',
              label: 'Tag Background Color',
              defaultValue: '#F0F0F0',
            },
            {
              name: 'tagTextColor',
              type: 'text',
              label: 'Tag Text Color',
              defaultValue: '#000000',
            },
          ],
        },
        {
          name: 'label',
          type: 'text',
          label: 'Category Label',
        },
        {
          name: 'labelSubtitle',
          type: 'text',
          label: 'Label Subtitle',
        },
        {
          name: 'labelColor',
          type: 'text',
          label: 'Label Text Color',
          defaultValue: '#000000',
          admin: {
            description: 'Hex color for label text',
          },
        },
        {
          name: 'labelBackgroundColor',
          type: 'text',
          label: 'Label Background Color',
          defaultValue: '#F5F5F5',
          admin: {
            description: 'Hex color for label background',
          },
        },
        {
          name: 'headline',
          type: 'text',
          required: true,
          label: 'Main Headline',
        },
        {
          name: 'headlineColor',
          type: 'text',
          label: 'Headline Text Color',
          defaultValue: '#000000',
          admin: {
            description: 'Hex color for main headline',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Hero Image',
        },
        {
          name: 'imageMobile',
          type: 'upload',
          relationTo: 'media',
          label: 'Hero Image Mobile (≤420px)',
        },
        {
          name: 'imageTablet',
          type: 'upload',
          relationTo: 'media',
          label: 'Hero Image Tablet (≤800px)',
        },
        {
          name: 'imageDesktop',
          type: 'upload',
          relationTo: 'media',
          label: 'Hero Image Desktop',
        },
        {
          name: 'imageAlt',
          type: 'text',
          label: 'Image Alt Text',
          defaultValue: 'Service hero image',
        },
        {
          name: 'backgroundColor',
          type: 'text',
          label: 'Section Background Color',
          defaultValue: '#FFFFFF',
          admin: {
            description: 'Hex color for hero section background',
          },
        },
      ],
    },
    // Content Section Configuration
    {
      name: 'contentSection',
      type: 'group',
      label: 'Content Section',
      fields: [
        {
          name: 'subtitle',
          type: 'text',
          required: true,
          label: 'Section Subtitle',
        },
        {
          name: 'subtitleColor',
          type: 'text',
          label: 'Subtitle Text Color',
          defaultValue: '#000000',
        },
        {
          name: 'richContent',
          type: 'richText',
          required: true,
          label: 'Rich Text Content',
        },
        {
          name: 'contentTextColor',
          type: 'text',
          label: 'Content Text Color',
          defaultValue: '#333333',
        },
        {
          name: 'backgroundColor',
          type: 'text',
          label: 'Section Background Color',
          defaultValue: '#FFFFFF',
        },
        {
          name: 'padding',
          type: 'select',
          label: 'Section Padding',
          defaultValue: 'default',
          options: [
            { label: 'Small', value: 'small' },
            { label: 'Default', value: 'default' },
            { label: 'Large', value: 'large' },
            { label: 'Extra Large', value: 'xlarge' },
          ],
        },
      ],
    },
    // SEO Settings
    {
      name: 'seo',
      type: 'group',
      label: 'SEO Settings',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'Meta Title',
          admin: {
            description: 'Override default title for SEO (60 characters recommended)',
          },
          maxLength: 100,
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta Description',
          admin: {
            description: 'Brief description for search engines (155-160 characters recommended)',
          },
          maxLength: 200,
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Social Share Image',
          admin: {
            description: 'Image for social media sharing (1200x630px recommended)',
          },
        },
        {
          name: 'keywords',
          type: 'text',
          label: 'Focus Keywords',
          admin: {
            description: 'Comma-separated keywords for SEO',
          },
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Auto-generate excerpt from content if not provided
        if (!data.excerpt && data.content) {
          const plainText = JSON.stringify(data.content)
            .replace(/<[^>]*>/g, '')
            .replace(/[{}"]/g, '')
          data.excerpt = plainText.substring(0, 200) + '...'
        }
        return data
      },
    ],
  },
  timestamps: true,
  versions: {
    drafts: {
      autosave: {
        interval: 375,
      },
    },
    maxPerDoc: 50,
  },
}
