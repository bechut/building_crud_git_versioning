import React, { memo, useMemo } from "react";
import { LayoutProps } from "../../routers";
import {
  Col,
  Row,
  Typography,
  Form,
  Input,
  Space,
  Button,
  notification,
} from "antd";
import { apiNames } from "../../redux/metadata";
import { ReduxDispatchHelper } from "../../redux/helper";

const BuildingDetail: React.FC<LayoutProps> = ({ reduxStates, params }) => {
  const [form] = Form.useForm();
  const { id } = params;

  const handleGetBuildingById = () => {
    new ReduxDispatchHelper<any>(
      apiNames.buildings.detail,
      {
        ":id": id,
      },
      (payload: any) => {
        form.setFieldsValue({
          name: payload.building.name,
          code: payload.building.code,
        });
      },
      (errors: any) => {
        notification.error({ message: errors.message });
      }
    ).do();
  };

  const handleUpdateBuildingById = (values: {
    name: string;
    code?: string;
  }) => {
    new ReduxDispatchHelper<any>(
      apiNames.buildings.update,
      {
        ":id": id,
        ...values,
      },
      (payload: any) => {
        console.log(payload)
        notification.success({ message: payload.message });
        form.setFieldsValue({
          name: payload.building.name,
          code: payload.building.code,
        });
      },
      (errors: any) => {
        notification.error({ message: errors.message });
      }
    ).do();
  };

  useMemo(() => {
    handleGetBuildingById();
  }, []);

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Row justify={"space-between"} align={"middle"}>
        <Col>
          <Typography.Title level={2}>
            Building
            {` "${
              reduxStates?.[apiNames.buildings.detail]?.data?.building?.name
            }"`}
          </Typography.Title>
        </Col>
      </Row>
      <Form
        requiredMark={false}
        onFinish={handleUpdateBuildingById}
        form={form}
        labelCol={{ span: 24 }}
      >
        <Form.Item rules={[{ required: true }]} name={"name"} label="Name">
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }, { max: 10 }]}
          name={"code"}
          label="Code"
        >
          <Input />
        </Form.Item>
        <Row justify={"space-between"}>
          <Col>
            <Space>
              <Button
                htmlType="submit"
                type="primary"
                loading={reduxStates?.[apiNames.buildings.update]?.loading}
              >
                Edit
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Space>
  );
};

export default memo(BuildingDetail);
