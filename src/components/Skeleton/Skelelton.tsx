import { Skeleton, Space } from "antd"
import styled from "styled-components"


const SkeletonBody = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
`
const SkeletonTextContentWrappep = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    flex-grow: 1;
    margin: 0 15px;
`

const MyLoader = () => (
        <SkeletonBody>
            <Space>
                <Skeleton.Avatar active={true} size={22} shape='square' />
                <Skeleton.Avatar active={true} size={30} shape='circle' />
            </Space>
            <SkeletonTextContentWrappep>
                <Skeleton.Input active={true} size='small' block={true} />
                <Skeleton.Input active={true} size='small' block={true} />
            </SkeletonTextContentWrappep>
            <Space>
                <Skeleton.Avatar active={true} size={30} shape='circle' />
                <Skeleton.Avatar active={true} size={30} shape='circle' />
            </Space>
        </SkeletonBody>
)

export default MyLoader