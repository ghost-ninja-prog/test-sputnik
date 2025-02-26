import { Skeleton, Space } from "antd"
import styled from "styled-components"


const SkeletonBody = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px;
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
                <Skeleton.Avatar size={22} shape='square' />
                <Skeleton.Avatar size={30} shape='circle' />
            </Space>
            <SkeletonTextContentWrappep>
                <Skeleton.Input size='small' block={true} />
                <Skeleton.Input size='small' block={true} />
            </SkeletonTextContentWrappep>
            <Space>
                <Skeleton.Avatar size={30} shape='circle' />
                <Skeleton.Avatar size={30} shape='circle' />
            </Space>
        </SkeletonBody>
)

export default MyLoader