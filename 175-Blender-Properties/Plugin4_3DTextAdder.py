import bpy


class PAGEKEY_OT_TextOperator(bpy.types.Operator):
    bl_idname = "pagekey.text_add"
    bl_label = "Add 3D text"

    def execute(self, context):
        scene = context.scene
        # Get text reference
        text_body = scene.pagekey_text_props.title
        # Add text object
        font_curve = bpy.data.curves.new(type="FONT", name="Font Curve")
        font_curve.body = text_body
        font_obj = bpy.data.objects.new(name="Font Object", object_data=font_curve)
        context.scene.collection.objects.link(font_obj)
        return {'FINISHED'}


class PAGEKEY_TextProperties(bpy.types.PropertyGroup):
    title: bpy.props.StringProperty(
        name="Title",
        description="Displayed in text",
        default="The Text",
        maxlen=1024,
    )


class PAGEKEY_PT_TextPanel(bpy.types.Panel):
    bl_idname = "PAGEKEY_PT_TextPanel"
    
    bl_category = "PageKey"
    bl_label = "Text Panel"
    bl_space_type = 'PROPERTIES'
    bl_region_type = 'WINDOW'
    bl_context = 'object'

    def draw(self, context):
        self.layout.label(text="Use the form to add some text.")
        self.layout.prop(context.scene.pagekey_text_props, "title")
        self.layout.operator("pagekey.text_add", text="Add Text")

bl_info = {
    "name": "PageKey 3D Text Adder",
    "blender": (2, 80, 0),
    "category": "Object",
}
def register():
    bpy.utils.register_class(PAGEKEY_OT_TextOperator)
    bpy.utils.register_class(PAGEKEY_TextProperties)
    bpy.utils.register_class(PAGEKEY_PT_TextPanel)
    bpy.types.Scene.pagekey_text_props = bpy.props.PointerProperty(type=PAGEKEY_TextProperties)

def unregister():
    bpy.utils.unregister_class(PAGEKEY_OT_TextOperator)
    bpy.utils.unregister_class(PAGEKEY_TextProperties)
    bpy.utils.unregister_class(PAGEKEY_PT_TextPanel)
    del bpy.types.Scene.pagekey_text_props

if __name__ == "__main__":
    register()
