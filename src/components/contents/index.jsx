import React, { useMemo, useEffect, useContext } from 'react'

import { ThumbnailContainer } from '../thumbnail-container'
import { ThumbnailItem } from '../thumbnail-item'
import { CATEGORY_TYPE } from '../../constants'
import { LanguageContext } from '../../hooks/context/languageContext'

export const Contents = ({ posts, countOfInitialPost, count, category }) => {
  const { language } = useContext(LanguageContext)
  const refinedPosts = useMemo(() =>
    posts
      .filter(
        ({ node }) =>
          category === CATEGORY_TYPE.ALL ||
          node.frontmatter.category === category
      )
      .filter(({ node: { fields: slug } }) => slug.slug.includes(language))
      .slice(0, count * countOfInitialPost)
  )

  useEffect(() => {
    console.log(refinedPosts)
  }, [])

  return (
    <ThumbnailContainer>
      {refinedPosts.map(({ node }, index) => (
        <ThumbnailItem node={node} key={`item_${index}`} />
      ))}
    </ThumbnailContainer>
  )
}
