import React from "react"
import kebabCase from "lodash.kebabcase"
import { graphql } from "gatsby"
import { Row, Cell } from "griding"

import { Container } from "../components/grid"
import * as S from "../components/styles.css"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Pagination from "../components/pagination"
import renderList from "../components/renderList"

const BlogCategory = ({ data, pageContext }) => {
  const { allMarkdownRemark } = data
  const { currentPage, numPages, tags, allCategories } = pageContext

  return (
    <Layout>
      <Seo title={tags} />

      <Container>
        <Row>
          <Cell xs={12}>
            <S.HeaderSectionTitle>Categories:</S.HeaderSectionTitle>
            <S.HeaderSectionList>
              {allCategories.map((cat) => (
                <S.HeaderSectionLink to={`/blog/tags/${kebabCase(cat)}`}>
                  {cat}
                </S.HeaderSectionLink>
              ))}
            </S.HeaderSectionList>
          </Cell>

          {allMarkdownRemark.edges.map(renderList)}
        </Row>

        <Pagination
          currentPage={currentPage}
          numPages={numPages}
          contextPage={`tags/${kebabCase(tags)}`}
        />
      </Container>
    </Layout>
  )
}

export default BlogCategory

export const query = graphql`
  query blogPostsListByCategory($tags: String, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tags] } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
            author
            tags
            image {
              childImageSharp {
                fluid {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`
