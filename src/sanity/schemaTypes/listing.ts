import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'listing',
  title: 'Listing',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required().min(3).max(80),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'kind',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          {title: 'Propiedad', value: 'property'},
          {title: 'Proyecto / Desarrollo', value: 'development'},
        ],
        layout: 'radio',
      },
      initialValue: 'property',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'operation',
      title: 'Operación',
      type: 'string',
      options: {
        list: [
          {title: 'Venta', value: 'sale'},
          {title: 'Alquiler', value: 'rent'},
          {title: 'Consultar', value: 'consult'},
        ],
        layout: 'radio',
      },
      initialValue: 'consult',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'status',
      title: 'Estado',
      type: 'string',
      options: {
        list: [
          {title: 'Disponible', value: 'available'},
          {title: 'Reservado', value: 'reserved'},
          {title: 'Vendido / Cerrado', value: 'closed'},
        ],
      },
      initialValue: 'available',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'isFeatured',
      title: 'Destacado (Home)',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'locationText',
      title: 'Ubicación (texto)',
      description: 'Ej: Montevideo · Prado / Pocitos / Zona a confirmar',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(80),
    }),

    defineField({
      name: 'addressNote',
      title: 'Nota de dirección (opcional)',
      description: 'Si no quieren dirección exacta: “Dirección a coordinar por privado”.',
      type: 'string',
    }),

    defineField({
      name: 'priceMode',
      title: 'Precio',
      type: 'string',
      options: {
        list: [
          {title: 'Monto', value: 'amount'},
          {title: 'Consultar', value: 'consult'},
        ],
        layout: 'radio',
      },
      initialValue: 'consult',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'price',
      title: 'Monto',
      type: 'number',
      hidden: ({document}) => document?.priceMode !== 'amount',
      validation: (Rule) =>
        Rule.custom((val, ctx) => {
          const mode = (ctx.document as any)?.priceMode
          if (mode === 'amount' && (val === undefined || val === null)) return 'Ingresá un monto'
          if (mode === 'amount' && typeof val === 'number' && val <= 0) return 'Debe ser mayor a 0'
          return true
        }),
    }),

    defineField({
      name: 'currency',
      title: 'Moneda',
      type: 'string',
      hidden: ({document}) => document?.priceMode !== 'amount',
      options: {list: [{title: 'USD', value: 'USD'}, {title: 'UYU', value: 'UYU'}]},
      initialValue: 'USD',
      validation: (Rule) =>
        Rule.custom((val, ctx) => {
          const mode = (ctx.document as any)?.priceMode
          if (mode === 'amount' && !val) return 'Seleccioná moneda'
          return true
        }),
    }),

    defineField({
      name: 'headline',
      title: 'Resumen corto (1 línea)',
      description: 'Aparece en cards y al inicio del detalle.',
      type: 'string',
      validation: (Rule) => Rule.max(120),
    }),

    defineField({
      name: 'summary',
      title: 'Descripción',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.max(1200),
    }),

    defineField({
      name: 'specs',
      title: 'Datos',
      type: 'object',
      options: {collapsed: false, collapsible: true},
      fields: [
        defineField({
          name: 'areaM2',
          title: 'Metros (m²)',
          type: 'number',
          validation: (Rule) => Rule.min(0),
        }),
        defineField({
          name: 'bedrooms',
          title: 'Dormitorios',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(20),
        }),
        defineField({
          name: 'bathrooms',
          title: 'Baños',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(20),
        }),
      ],
    }),

    defineField({
      name: 'features',
      title: 'Características / Amenities',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Ej: Terraza, Piscina, Parrillero, Vista despejada…',
      validation: (Rule) => Rule.max(14),
    }),

    defineField({
      name: 'gallery',
      title: 'Galería',
      type: 'array',
      of: [
        defineField({
          name: 'galleryItem',
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              validation: (Rule) => Rule.max(120),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),

    defineField({
      name: 'igPostUrl',
      title: 'Link a Instagram (opcional)',
      type: 'url',
    }),

    defineField({
      name: 'seo',
      title: 'SEO (opcional)',
      type: 'object',
      options: {collapsed: true, collapsible: true},
      fields: [
        defineField({name: 'title', title: 'SEO Title', type: 'string', validation: (Rule) => Rule.max(60)}),
        defineField({
          name: 'description',
          title: 'SEO Description',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.max(160),
        }),
        defineField({
          name: 'ogImage',
          title: 'OG Image (opcional)',
          type: 'image',
          options: {hotspot: true},
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'gallery.0',
      kind: 'kind',
      operation: 'operation',
      status: 'status',
      featured: 'isFeatured',
      location: 'locationText',
    },
    prepare(sel) {
      const kindLabel = sel.kind === 'development' ? 'Proyecto' : 'Propiedad'
      const opLabel =
        sel.operation === 'sale' ? 'Venta' : sel.operation === 'rent' ? 'Alquiler' : 'Consultar'
      const star = sel.featured ? '★ ' : ''
      const subtitle = `${kindLabel} · ${opLabel} · ${sel.status === 'available' ? 'Disponible' : sel.status === 'reserved' ? 'Reservado' : 'Cerrado'} · ${sel.location ?? ''}`

      return {title: `${star}${sel.title}`, subtitle, media: sel.media}
    },
  },
})